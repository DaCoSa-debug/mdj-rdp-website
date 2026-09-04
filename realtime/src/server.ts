import { createServer } from 'node:http'
import { Server } from 'socket.io'
import {
  createRoomSchema,
  emoteSchema,
  fireSchema,
  gameReadySchema,
  joinRoomSchema,
  leaveRoomSchema,
  resumeRoomSchema,
  type ClientToServerEvents,
  type RoomErrorCode,
  type ServerToClientEvents,
} from '../../shared/multiplayerProtocol.js'
import { RoomManager, RoomManagerError } from './core/RoomManager.js'
import { BattleshipError, BattleshipManager } from './games/BattleshipManager.js'

const port = Number(process.env.PORT ?? 3002)
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173').split(',').map(value => value.trim()).filter(Boolean)
const ttlMinutes = Number(process.env.ROOM_TTL_MINUTES ?? 30)

export function createRealtimeServer(options: { manager?: RoomManager; corsOrigins?: string[] } = {}) {
  const httpServer = createServer((request, response) => {
    if (request.url === '/health') {
      response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      response.end(JSON.stringify({ status: 'ok' }))
      return
    }
    response.writeHead(404)
    response.end()
  })
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: { origin: options.corsOrigins ?? allowedOrigins, methods: ['GET', 'POST'] },
  })
  const manager = options.manager ?? new RoomManager(undefined, ttlMinutes * 60 * 1000)
  const roomBySocket = new Map<string, string>()
  const playerBySocket = new Map<string, string>()
  const battleship = new BattleshipManager()
  const requestsBySocket = new Map<string, { count: number; startedAt: number }>()

  const emitRoomState = (code: string) => {
    const room = manager.getRoom(code)
    if (room) io.to(code).emit('room:state', room)
  }
  const emitBattleState = (code: string) => {
    const room = manager.getRoom(code)
    if (!room) return
    room.players.forEach(player => {
      const state = battleship.state(code, player.id)
      if (state && player.connected) io.to(player.id).emit('game:state', state)
    })
  }

  const errorFor = (error: unknown): { code: RoomErrorCode; message: string } => {
    if (error instanceof RoomManagerError) {
      const messages: Record<RoomManagerError['code'], string> = {
        ROOM_NOT_FOUND: 'Cette salle n’existe pas ou a expiré.',
        ROOM_FULL: 'Cette salle est déjà complète.',
        SESSION_INVALID: 'La session temporaire est invalide.',
      }
      return { code: error.code, message: messages[error.code] }
    }
    if (error instanceof BattleshipError) return { code: 'INVALID_PAYLOAD', message: error.message }
    return { code: 'INVALID_PAYLOAD', message: 'La demande est invalide.' }
  }

  io.on('connection', socket => {
    const withinRateLimit = () => {
      const now = Date.now()
      const current = requestsBySocket.get(socket.id)
      if (!current || now - current.startedAt > 10_000) {
        requestsBySocket.set(socket.id, { count: 1, startedAt: now })
        return true
      }
      current.count += 1
      return current.count <= 20
    }

    const guarded = <T,>(schema: { safeParse: (value: unknown) => { success: boolean; data?: T } }, action: (payload: T) => void) => (payload: unknown) => {
      if (!withinRateLimit()) {
        socket.emit('room:error', { code: 'RATE_LIMITED', message: 'Trop de demandes. Réessaie dans un instant.' })
        return
      }
      const parsed = schema.safeParse(payload)
      if (!parsed.success || parsed.data === undefined) {
        socket.emit('room:error', { code: 'INVALID_PAYLOAD', message: 'Les informations sont invalides.' })
        return
      }
      try { action(parsed.data) } catch (error) { socket.emit('room:error', errorFor(error)) }
    }

    socket.on('room:create', guarded(createRoomSchema, payload => {
      const result = manager.createRoom(payload.gameType, payload.nickname.trim(), payload.avatar, socket.id)
      roomBySocket.set(socket.id, result.room.code)
      playerBySocket.set(socket.id, result.session.playerId)
      socket.join(result.room.code)
      socket.join(result.session.playerId)
      socket.emit('room:created', { room: result.room, session: result.session })
    }))

    socket.on('room:join', guarded(joinRoomSchema, payload => {
      const result = manager.joinRoom(payload.roomCode, payload.nickname.trim(), payload.avatar, socket.id)
      roomBySocket.set(socket.id, result.room.code)
      playerBySocket.set(socket.id, result.session.playerId)
      socket.join(result.room.code)
      socket.join(result.session.playerId)
      socket.emit('room:joined', { room: result.room, session: result.session })
      socket.to(result.room.code).emit('player:joined', { id: result.player.id, nickname: result.player.nickname, avatar: result.player.avatar, connected: true })
      emitRoomState(result.room.code)
    }))

    socket.on('room:resume', guarded(resumeRoomSchema, payload => {
      const result = manager.resumeRoom(payload.roomCode, payload.playerId, payload.sessionToken, socket.id)
      roomBySocket.set(socket.id, result.room.code)
      playerBySocket.set(socket.id, payload.playerId)
      socket.join(result.room.code)
      socket.join(payload.playerId)
      socket.emit('room:joined', { room: result.room, session: { playerId: payload.playerId, sessionToken: payload.sessionToken } })
      emitRoomState(result.room.code)
      emitBattleState(result.room.code)
    }))

    socket.on('room:leave', guarded(leaveRoomSchema, payload => {
      const result = manager.abandonRoom(payload.roomCode, socket.id)
      roomBySocket.delete(socket.id)
      playerBySocket.delete(socket.id)
      socket.leave(payload.roomCode)
      battleship.delete(payload.roomCode)
      if (result.player) socket.to(payload.roomCode).emit('player:left', { id: result.player.id, nickname: result.player.nickname, avatar: result.player.avatar, connected: false })
      emitRoomState(payload.roomCode)
    }))

    socket.on('game:ready', guarded(gameReadySchema, payload => {
      const room = manager.getRoom(payload.roomCode)
      const playerId = playerBySocket.get(socket.id)
      if (!room || !playerId) throw new BattleshipError('Session de jeu introuvable.')
      battleship.prepare(payload.roomCode, room.players.map(player => player.id), playerId)
      emitBattleState(payload.roomCode)
    }))

    socket.on('game:fire', guarded(fireSchema, payload => {
      const playerId = playerBySocket.get(socket.id)
      if (!playerId) throw new BattleshipError('Session de jeu introuvable.')
      const result = battleship.fire(payload.roomCode, playerId, payload.cell)
      io.to(payload.roomCode).emit('game:effect', { type: result.winner ? 'win' : result.hit ? 'hit' : 'miss' })
      emitBattleState(payload.roomCode)
    }))

    socket.on('game:emote', guarded(emoteSchema, payload => {
      const playerId = playerBySocket.get(socket.id)
      const room = manager.getRoom(payload.roomCode)
      const player = room?.players.find(candidate => candidate.id === playerId)
      if (!player || !playerId) throw new BattleshipError('Session de jeu introuvable.')
      io.to(payload.roomCode).emit('game:emote', { playerId, nickname: player.nickname, emoji: payload.emoji })
    }))

    socket.on('disconnect', () => {
      requestsBySocket.delete(socket.id)
      playerBySocket.delete(socket.id)
      const code = roomBySocket.get(socket.id)
      roomBySocket.delete(socket.id)
      const result = manager.disconnect(socket.id)
      if (code && result.player) socket.to(code).emit('player:left', { id: result.player.id, nickname: result.player.nickname, avatar: result.player.avatar, connected: false })
      if (code) emitRoomState(code)
    })
  })

  const expiryTimer = setInterval(() => {
    manager.expireInactiveRooms().forEach(room => { battleship.delete(room.code); io.to(room.code).emit('room:expired', { roomCode: room.code }) })
  }, 60_000)
  expiryTimer.unref()

  return { httpServer, io, manager, close: () => new Promise<void>(resolve => io.close(() => httpServer.close(() => resolve()))) }
}

if (process.env.VITEST === undefined) {
  const realtime = createRealtimeServer()
  realtime.httpServer.listen(port, () => console.log(`MDJ realtime server listening on :${port}`))
}
