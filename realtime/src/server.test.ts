import { afterEach, describe, expect, it } from 'vitest'
import { io as clientIo, type Socket } from 'socket.io-client'
import { createRealtimeServer } from './server.js'

const servers: Array<ReturnType<typeof createRealtimeServer>> = []

afterEach(async () => { await Promise.all(servers.splice(0).map(server => server.close())) })

describe('realtime server', () => {
  it('responds to the Railway health check', async () => {
    const server = createRealtimeServer()
    servers.push(server)
    await new Promise<void>(resolve => server.httpServer.listen(0, resolve))
    const address = server.httpServer.address()
    if (!address || typeof address === 'string') throw new Error('Expected TCP address')
    const response = await fetch(`http://127.0.0.1:${address.port}/health`)
    await expect(response.json()).resolves.toEqual({ status: 'ok' })
  })

  it('updates the host when a guest joins', async () => {
    const server = createRealtimeServer({ corsOrigins: ['http://localhost:5173'] })
    servers.push(server)
    await new Promise<void>(resolve => server.httpServer.listen(0, resolve))
    const address = server.httpServer.address()
    if (!address || typeof address === 'string') throw new Error('Expected TCP address')
    const url = `http://127.0.0.1:${address.port}`
    const host = clientIo(url, { transports: ['websocket'] })
    const guest = clientIo(url, { transports: ['websocket'] })
    const sockets: Socket[] = [host, guest]
    try {
      const roomCode = await new Promise<string>((resolve, reject) => {
        host.once('room:created', ({ room }) => resolve(room.code))
        host.once('room:error', reject)
        host.emit('room:create', { gameType: 'battleship', nickname: 'Alex', avatar: '🎮' })
      })
      const updated = new Promise<number>(resolve => host.on('room:state', room => { if (room.players.length === 2) resolve(room.players.length) }))
      guest.emit('room:join', { roomCode, nickname: 'Sam', avatar: '🎧' })
      await expect(updated).resolves.toBe(2)
    } finally { sockets.forEach(socket => socket.close()) }
  })
})
