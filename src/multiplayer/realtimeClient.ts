import { io, type Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '../../shared/multiplayerProtocol'

export type RealtimeSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export function createRealtimeClient(): RealtimeSocket {
  const url = import.meta.env.VITE_REALTIME_URL || 'http://localhost:3002'
  return io(url, {
    autoConnect: false,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
  })
}

export function publicAppOrigin(): string {
  return import.meta.env.VITE_PUBLIC_APP_ORIGIN || window.location.origin
}
