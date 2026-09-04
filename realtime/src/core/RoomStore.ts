import type { Avatar, GameType, PublicRoomState } from '../../../shared/multiplayerProtocol.js'

export type RoomPlayer = {
  id: string
  nickname: string
  avatar: Avatar
  sessionToken: string
  connected: boolean
  socketId?: string
}

export type Room = {
  code: string
  gameType: GameType
  players: RoomPlayer[]
  createdAt: number
  lastActivityAt: number
}

export interface RoomStore {
  create(room: Room): void
  get(code: string): Room | undefined
  delete(code: string): void
  list(): Room[]
}

export class InMemoryRoomStore implements RoomStore {
  private readonly rooms = new Map<string, Room>()

  create(room: Room): void { this.rooms.set(room.code, room) }
  get(code: string): Room | undefined { return this.rooms.get(code) }
  delete(code: string): void { this.rooms.delete(code) }
  list(): Room[] { return [...this.rooms.values()] }
}

export function toPublicRoom(room: Room, expiresAt: number): PublicRoomState {
  return {
    code: room.code,
    gameType: room.gameType,
    capacity: 2,
    expiresAt: new Date(expiresAt).toISOString(),
    players: room.players.map(({ id, nickname, avatar, connected }) => ({ id, nickname, avatar, connected })),
  }
}
