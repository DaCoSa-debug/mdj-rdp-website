import { customAlphabet, nanoid } from 'nanoid'
import type { Avatar, GameType, PlayerSession, PublicRoomState } from '../../../shared/multiplayerProtocol.js'
import { InMemoryRoomStore, type Room, type RoomPlayer, type RoomStore, toPublicRoom } from './RoomStore.js'

const roomCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 6)

export class RoomManagerError extends Error {
  constructor(public readonly code: 'ROOM_NOT_FOUND' | 'ROOM_FULL' | 'SESSION_INVALID') { super(code) }
}

export class RoomManager {
  constructor(
    private readonly store: RoomStore = new InMemoryRoomStore(),
    private readonly ttlMs = 30 * 60 * 1000,
    private readonly now: () => number = () => Date.now(),
  ) {}

  createRoom(gameType: GameType, nickname: string, avatar: Avatar, socketId: string): { room: PublicRoomState; session: PlayerSession } {
    let code = roomCode()
    for (let attempt = 0; this.store.get(code) && attempt < 20; attempt += 1) code = roomCode()
    if (this.store.get(code)) throw new Error('Unable to generate an available room code')

    const player = this.newPlayer(nickname, avatar, socketId)
    const now = this.now()
    const room: Room = { code, gameType, players: [player], createdAt: now, lastActivityAt: now }
    this.store.create(room)
    return { room: this.publicRoom(room), session: this.sessionFor(player) }
  }

  joinRoom(code: string, nickname: string, avatar: Avatar, socketId: string): { room: PublicRoomState; session: PlayerSession; player: RoomPlayer } {
    const room = this.requireRoom(code)
    if (room.players.length >= 2) throw new RoomManagerError('ROOM_FULL')
    const player = this.newPlayer(nickname, avatar, socketId)
    room.players.push(player)
    room.lastActivityAt = this.now()
    return { room: this.publicRoom(room), session: this.sessionFor(player), player }
  }

  resumeRoom(code: string, playerId: string, sessionToken: string, socketId: string): { room: PublicRoomState; player: RoomPlayer } {
    const room = this.requireRoom(code)
    const player = room.players.find(candidate => candidate.id === playerId && candidate.sessionToken === sessionToken)
    if (!player) throw new RoomManagerError('SESSION_INVALID')
    player.connected = true
    player.socketId = socketId
    room.lastActivityAt = this.now()
    return { room: this.publicRoom(room), player }
  }

  leaveRoom(code: string, socketId: string): { room?: PublicRoomState; player?: RoomPlayer } {
    const room = this.store.get(code)
    if (!room) return {}
    const player = room.players.find(candidate => candidate.socketId === socketId)
    if (!player) return { room: this.publicRoom(room) }
    player.connected = false
    player.socketId = undefined
    room.lastActivityAt = this.now()
    return { room: this.publicRoom(room), player }
  }

  abandonRoom(code: string, socketId: string): { room?: PublicRoomState; player?: RoomPlayer } {
    const room = this.store.get(code)
    if (!room) return {}
    const player = room.players.find(candidate => candidate.socketId === socketId)
    if (!player) return { room: this.publicRoom(room) }
    room.players = room.players.filter(candidate => candidate.id !== player.id)
    room.lastActivityAt = this.now()
    if (room.players.length === 0) this.store.delete(code)
    return { room: room.players.length ? this.publicRoom(room) : undefined, player }
  }

  disconnect(socketId: string): { room?: PublicRoomState; player?: RoomPlayer } {
    for (const room of this.store.list()) {
      if (room.players.some(player => player.socketId === socketId)) return this.leaveRoom(room.code, socketId)
    }
    return {}
  }

  expireInactiveRooms(): Room[] {
    const cutoff = this.now() - this.ttlMs
    const expired = this.store.list().filter(room => room.lastActivityAt <= cutoff)
    expired.forEach(room => this.store.delete(room.code))
    return expired
  }

  getRoom(code: string): PublicRoomState | undefined {
    const room = this.store.get(code)
    return room ? this.publicRoom(room) : undefined
  }

  private requireRoom(code: string): Room {
    const room = this.store.get(code)
    if (!room) throw new RoomManagerError('ROOM_NOT_FOUND')
    return room
  }

  private newPlayer(nickname: string, avatar: Avatar, socketId: string): RoomPlayer {
    return { id: nanoid(16), nickname, avatar, sessionToken: nanoid(32), connected: true, socketId }
  }

  private sessionFor(player: RoomPlayer): PlayerSession {
    return { playerId: player.id, sessionToken: player.sessionToken }
  }

  private publicRoom(room: Room): PublicRoomState {
    return toPublicRoom(room, room.lastActivityAt + this.ttlMs)
  }
}
