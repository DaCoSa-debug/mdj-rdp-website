import { z } from 'zod'

export const GAME_TYPES = ['battleship'] as const
export type GameType = (typeof GAME_TYPES)[number]

export const AVATARS = ['🛹', '🎧', '🎮', '🧢', '🚲', '🌟'] as const
export type Avatar = (typeof AVATARS)[number]

const roomCodeSchema = z.string().regex(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/)
const nicknameSchema = z.string().trim().min(2).max(18).regex(/^[\p{L}\p{N} ._-]+$/u)
const avatarSchema = z.enum(AVATARS)

export const createRoomSchema = z.object({
  gameType: z.enum(GAME_TYPES),
  nickname: nicknameSchema,
  avatar: avatarSchema,
})

export const joinRoomSchema = z.object({
  roomCode: roomCodeSchema,
  nickname: nicknameSchema,
  avatar: avatarSchema,
})

export const resumeRoomSchema = z.object({
  roomCode: roomCodeSchema,
  playerId: z.string().min(12).max(64),
  sessionToken: z.string().min(20).max(128),
})

export const leaveRoomSchema = z.object({ roomCode: roomCodeSchema })
export const gameReadySchema = z.object({ roomCode: roomCodeSchema })
export const fireSchema = z.object({ roomCode: roomCodeSchema, cell: z.number().int().min(0).max(99) })
export const EMOTES = ['🔥', '😅', '😎', '💥', '👏', '👋'] as const
export const emoteSchema = z.object({ roomCode: roomCodeSchema, emoji: z.enum(EMOTES) })

export type PublicPlayer = {
  id: string
  nickname: string
  avatar: Avatar
  connected: boolean
}

export type PublicRoomState = {
  code: string
  gameType: GameType
  players: PublicPlayer[]
  capacity: 2
  expiresAt: string
}

export type PlayerSession = {
  playerId: string
  sessionToken: string
}

export type RoomErrorCode = 'INVALID_PAYLOAD' | 'ROOM_NOT_FOUND' | 'ROOM_FULL' | 'SESSION_INVALID' | 'ROOM_EXPIRED' | 'RATE_LIMITED'

export type BattleCell = 'ship' | 'hit' | 'miss'
export type BattleState = {
  phase: 'placement' | 'playing' | 'finished'
  yourBoard: Record<number, BattleCell>
  targetBoard: Record<number, 'hit' | 'miss'>
  yourTurn: boolean
  yourFleetReady: boolean
  winnerId?: string
}

export type ClientToServerEvents = {
  'room:create': (payload: z.infer<typeof createRoomSchema>) => void
  'room:join': (payload: z.infer<typeof joinRoomSchema>) => void
  'room:resume': (payload: z.infer<typeof resumeRoomSchema>) => void
  'room:leave': (payload: z.infer<typeof leaveRoomSchema>) => void
  'game:ready': (payload: z.infer<typeof gameReadySchema>) => void
  'game:fire': (payload: z.infer<typeof fireSchema>) => void
  'game:emote': (payload: z.infer<typeof emoteSchema>) => void
}

export type ServerToClientEvents = {
  'room:created': (payload: { room: PublicRoomState; session: PlayerSession }) => void
  'room:joined': (payload: { room: PublicRoomState; session: PlayerSession }) => void
  'room:state': (room: PublicRoomState) => void
  'room:error': (payload: { code: RoomErrorCode; message: string }) => void
  'room:expired': (payload: { roomCode: string }) => void
  'player:joined': (player: PublicPlayer) => void
  'player:left': (player: PublicPlayer) => void
  'game:state': (state: BattleState) => void
  'game:effect': (payload: { type: 'hit' | 'miss' | 'sunk' | 'turn' | 'win' }) => void
  'game:emote': (payload: { playerId: string; nickname: string; emoji: z.infer<typeof emoteSchema>['emoji'] }) => void
}
