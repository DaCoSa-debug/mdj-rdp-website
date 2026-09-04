import { describe, expect, it } from 'vitest'
import { createRoomSchema, joinRoomSchema } from '../../shared/multiplayerProtocol.js'

describe('multiplayer protocol validation', () => {
  it('rejects invalid nicknames', () => {
    expect(createRoomSchema.safeParse({ gameType: 'battleship', nickname: 'A', avatar: '🎮' }).success).toBe(false)
    expect(createRoomSchema.safeParse({ gameType: 'battleship', nickname: '<script>', avatar: '🎮' }).success).toBe(false)
  })

  it('rejects avatars outside the predefined allowlist', () => {
    expect(joinRoomSchema.safeParse({ roomCode: 'ABC234', nickname: 'Alex', avatar: '🦊' }).success).toBe(false)
  })
})
