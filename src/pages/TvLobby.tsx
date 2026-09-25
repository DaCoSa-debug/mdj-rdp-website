import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import type { HostSession, PublicRoomState } from '../../shared/multiplayerProtocol'
import { createRealtimeClient, publicAppOrigin, type RealtimeSocket } from '../multiplayer/realtimeClient'

const HOST_SESSION_KEY = 'mdj-tv-host-session'
const TV_CAPACITY = 2

type SavedHostSession = HostSession & { roomCode: string }

function readHostSession(): SavedHostSession | null {
  try {
    const raw = localStorage.getItem(HOST_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as SavedHostSession
    return session.roomCode && session.hostId && session.sessionToken ? session : null
  } catch {
    return null
  }
}

function clearHostSession(): void {
  localStorage.removeItem(HOST_SESSION_KEY)
}

type Status = 'idle' | 'connecting' | 'ready' | 'offline'

function TvLobby() {
  const socketRef = useRef<RealtimeSocket | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [room, setRoom] = useState<PublicRoomState | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const socket = createRealtimeClient()
    socketRef.current = socket

    socket.on('connect', () => {
      setStatus('ready')
      const saved = readHostSession()
      if (saved?.roomCode) {
        socket.emit('room:host-resume', saved)
      }
    })
    socket.on('disconnect', () => setStatus('offline'))

    socket.on('room:host-created', ({ room: nextRoom }) => {
      setRoom(nextRoom)
      setError('')
    })

    socket.on('room:state', (nextRoom: PublicRoomState) => {
      setRoom(nextRoom)
    })

    socket.on('room:error', payload => {
      if (payload.code === 'SESSION_INVALID' || payload.code === 'ROOM_NOT_FOUND' || payload.code === 'ROOM_EXPIRED') {
        clearHostSession()
        setRoom(null)
        setStatus('idle')
      } else {
        setError(payload.message)
      }
    })

    socket.connect()
    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  function createRoom(): void {
    if (status !== 'ready' || !socketRef.current?.connected) return
    setError('')
    socketRef.current.emit('room:host-create', { gameType: 'battleship', capacity: TV_CAPACITY })
  }

  function leaveRoom(): void {
    clearHostSession()
    setRoom(null)
    setError('')
  }

  if (room) {
    const inviteUrl = `${publicAppOrigin()}/arcade/join/${room.code}`
    const player1 = room.players[0]
    const player2 = room.players[1]

    return (
      <main className="min-h-screen bg-[#231F20] text-white flex flex-col items-center justify-center p-8">
        <p className="text-xs font-black tracking-[.3em] text-[#FBB040]">MDJ ARCADE</p>
        <h1 className="mt-2 text-center text-3xl sm:text-4xl font-black">
          Scanne le code pour rejoindre
        </h1>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="rounded-2xl bg-white p-4 shadow-2xl">
            <QRCodeSVG value={inviteUrl} size={240} level="M" includeMargin />
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-white/50">SALLE</p>
            <p className="font-mono text-5xl font-black tracking-[.25em] text-[#FBB040] mt-1">
              {room.code}
            </p>
          </div>
        </div>

        <div className="mt-10 w-full max-w-md">
          <p className="text-xs font-black tracking-[.2em] text-white/50 text-center mb-4">JOUEURS</p>

          <div className="space-y-3">
            <div className={`flex items-center gap-4 rounded-2xl border p-4 ${player1 ? 'border-[#29ABE2]/50 bg-[#29ABE2]/10' : 'border-white/10 bg-white/5'}`}>
              <span className={`text-2xl font-black ${player1 ? 'text-[#29ABE2]' : 'text-white/30'}`} aria-hidden>
                {player1 ? '●' : '○'}
              </span>
              <div>
                <p className="font-black text-lg">Joueur 1</p>
                <p className={`text-sm ${player1 ? 'text-[#9edfff]' : 'text-white/40'}`}>
                  {player1 ? 'Connecté' : 'En attente…'}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-4 rounded-2xl border p-4 ${player2 ? 'border-[#F05063]/50 bg-[#F05063]/10' : 'border-white/10 bg-white/5'}`}>
              <span className={`text-2xl font-black ${player2 ? 'text-[#F05063]' : 'text-white/30'}`} aria-hidden>
                {player2 ? '●' : '○'}
              </span>
              <div>
                <p className="font-black text-lg">Joueur 2</p>
                <p className={`text-sm ${player2 ? 'text-[#ffb1ba]' : 'text-white/40'}`}>
                  {player2 ? 'Connecté' : 'En attente…'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={leaveRoom}
          className="mt-8 min-h-12 rounded-2xl border border-white/20 px-6 font-bold text-white/60 hover:bg-white/10 transition-colors"
        >
          Quitter la salle
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#231F20] text-white flex flex-col items-center justify-center px-6 py-8">
      <img src="/mdj-logo-white.png" className="h-16 mb-6" alt="MDJ-RDP" />
      <h1 className="font-black text-4xl sm:text-5xl text-center">
        MDJ{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #FBB040, #F05063, #29ABE2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Arcade
        </span>
      </h1>
      <p className="mt-3 text-center text-lg text-white/60">
        Jouez ensemble.
        <br />
        Utilisez vos téléphones comme contrôleurs.
      </p>

      <button
        onClick={createRoom}
        disabled={status !== 'ready'}
        className="mt-8 min-h-16 rounded-2xl bg-gradient-to-r from-[#FBB040] to-[#F05063] px-10 text-xl font-black text-white shadow-xl disabled:opacity-50 active:scale-[.98] transition-all"
      >
        Créer une salle
      </button>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-[#F05063]/15 px-4 py-3 text-sm font-semibold text-[#ffb0b9]">
          {error}
        </p>
      )}

      <p className="mt-6 text-xs text-white/40">
        {status === 'ready' ? '● Serveur connecté' : status === 'offline' ? '● Serveur indisponible' : '● Connexion au serveur…'}
      </p>

      <Link to="/arcade" className="mt-8 text-sm font-bold text-white/50 hover:text-white">
        ← Retour à l'arcade
      </Link>
    </main>
  )
}

export default TvLobby
