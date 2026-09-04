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

export type ClientToServerEvents = {
  'room:create': (payload: z.infer<typeof createRoomSchema>) => void
  'room:join': (payload: z.infer<typeof joinRoomSchema>) => void
  'room:resume': (payload: z.infer<typeof resumeRoomSchema>) => void
  'room:leave': (payload: z.infer<typeof leaveRoomSchema>) => void
}

export type ServerToClientEvents = {
  'room:created': (payload: { room: PublicRoomState; session: PlayerSession }) => void
  'room:joined': (payload: { room: PublicRoomState; session: PlayerSession }) => void
  'room:state': (room: PublicRoomState) => void
  'room:error': (payload: { code: RoomErrorCode; message: string }) => void
  'room:expired': (payload: { roomCode: string }) => void
  'player:joined': (player: PublicPlayer) => void
  'player:left': (player: PublicPlayer) => void
}
