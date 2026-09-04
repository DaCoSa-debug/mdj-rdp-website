import { describe, expect, it } from 'vitest'
import { RoomManager, RoomManagerError } from './RoomManager.js'
import { InMemoryRoomStore } from './RoomStore.js'

const manager = (now = () => 1_000) => new RoomManager(new InMemoryRoomStore(), 1_000, now)

describe('RoomManager', () => {
  it('creates rooms with safe unique short codes and no credentials in room state', () => {
    const rooms = manager()
    const first = rooms.createRoom('battleship', 'Alex', '🎮', 'socket-a')
    const second = rooms.createRoom('battleship', 'Léo', '🛹', 'socket-b')
    expect(first.room.code).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/)
    expect(first.room.code).not.toBe(second.room.code)
    expect(JSON.stringify(first.room)).not.toContain('sessionToken')
    expect(JSON.stringify(first.room)).not.toContain(first.session.sessionToken)
  })

  it('joins a second player and rejects a third', () => {
    const rooms = manager()
    const host = rooms.createRoom('battleship', 'Alex', '🎮', 'socket-a')
    rooms.joinRoom(host.room.code, 'Sam', '🎧', 'socket-b')
    expect(rooms.getRoom(host.room.code)?.players).toHaveLength(2)
    expect(() => rooms.joinRoom(host.room.code, 'Lee', '🚲', 'socket-c')).toThrow(new RoomManagerError('ROOM_FULL'))
  })

  it('rejects unknown rooms and invalid sessions', () => {
    const rooms = manager()
    expect(() => rooms.joinRoom('ABCDEF', 'Sam', '🎧', 'socket-b')).toThrow(new RoomManagerError('ROOM_NOT_FOUND'))
    const host = rooms.createRoom('battleship', 'Alex', '🎮', 'socket-a')
    expect(() => rooms.resumeRoom(host.room.code, 'wrong-player-id', 'wrong-token-which-is-long-enough', 'socket-b')).toThrow(new RoomManagerError('SESSION_INVALID'))
  })

  it('expires inactive rooms', () => {
    let clock = 1_000
    const rooms = manager(() => clock)
    const host = rooms.createRoom('battleship', 'Alex', '🎮', 'socket-a')
    clock = 2_000
    expect(rooms.expireInactiveRooms()).toHaveLength(1)
    expect(rooms.getRoom(host.room.code)).toBeUndefined()
  })
})
