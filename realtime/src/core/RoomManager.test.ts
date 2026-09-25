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

describe('RoomManager host-capable rooms', () => {
  it('creates a host-only room with zero players', () => {
    const rooms = manager()
    const result = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    expect(result.room.players).toHaveLength(0)
    expect(result.room.capacity).toBe(2)
    expect(result.session.hostId).toBeTruthy()
    expect(result.session.sessionToken).toBeTruthy()
    expect(JSON.stringify(result.room)).not.toContain(result.session.sessionToken)
  })

  it('host room allows two players to join', () => {
    const rooms = manager()
    const host = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    rooms.joinRoom(host.room.code, 'Sam', '🎧', 'socket-b')
    expect(rooms.getRoom(host.room.code)?.players).toHaveLength(1)
    rooms.joinRoom(host.room.code, 'Lee', '🚲', 'socket-c')
    expect(rooms.getRoom(host.room.code)?.players).toHaveLength(2)
  })

  it('host room with two players rejects a third', () => {
    const rooms = manager()
    const host = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    rooms.joinRoom(host.room.code, 'Sam', '🎧', 'socket-b')
    rooms.joinRoom(host.room.code, 'Lee', '🚲', 'socket-c')
    expect(() => rooms.joinRoom(host.room.code, 'Alex', '🌟', 'socket-d')).toThrow(new RoomManagerError('ROOM_FULL'))
  })

  it('host does not consume player capacity', () => {
    const rooms = manager()
    const host = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    expect(rooms.getRoom(host.room.code)?.players).toHaveLength(0)
    expect(rooms.getRoom(host.room.code)?.capacity).toBe(2)
  })

  it('resumeHostRoom returns the same host session', () => {
    const rooms = manager()
    const created = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    const resumed = rooms.resumeHostRoom(created.room.code, created.session.hostId, created.session.sessionToken, 'socket-b')
    expect(resumed.host.id).toBe(created.session.hostId)
    expect(resumed.room.code).toBe(created.room.code)
  })

  it('resumeHostRoom rejects invalid host session', () => {
    const rooms = manager()
    const created = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    expect(() => rooms.resumeHostRoom(created.room.code, 'wrong-host-id', 'wrong-token-which-is-long-enough', 'socket-b')).toThrow(new RoomManagerError('SESSION_INVALID'))
  })

  it('createRoom still creates a player as first occupant', () => {
    const rooms = manager()
    const result = rooms.createRoom('battleship', 'Alex', '🎮', 'socket-a')
    expect(result.room.players).toHaveLength(1)
    expect(result.room.players[0].nickname).toBe('Alex')
    expect(result.room.players[0].id).toBe(result.session.playerId)
  })

  it('getRoomWithHost exposes hasHost and hostAvatar', () => {
    const rooms = manager()
    const host = rooms.createHostRoom('battleship', 2, '🎮', 'socket-a')
    const withHost = rooms.getRoomWithHost(host.room.code)
    expect(withHost).toBeDefined()
    expect(withHost?.hasHost).toBe(true)
    expect(withHost?.hostAvatar).toBe('🎮')
    const playerRoom = rooms.createRoom('battleship', 'Alex', '🎮', 'socket-b')
    const playerWithHost = rooms.getRoomWithHost(playerRoom.room.code)
    expect(playerWithHost?.hasHost).toBe(false)
    expect(playerWithHost?.hostAvatar).toBeUndefined()
  })
})
