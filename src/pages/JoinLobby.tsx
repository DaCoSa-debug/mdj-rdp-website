import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Avatar, PlayerSession, PublicRoomState } from '../../shared/multiplayerProtocol'
import { AVATARS } from '../../shared/multiplayerProtocol'
import { createRealtimeClient, type RealtimeSocket } from '../multiplayer/realtimeClient'

const PLAYER_SESSION_KEY = 'mdj-player-session'
const MAX_NICKNAME_LENGTH = 18

type SavedPlayerSession = PlayerSession & { roomCode: string }

function readPlayerSession(): SavedPlayerSession | null {
  try {
    const raw = localStorage.getItem(PLAYER_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as SavedPlayerSession
    return session.roomCode && session.playerId && session.sessionToken ? session : null
  } catch {
    return null
  }
}

function savePlayerSession(roomCode: string, session: PlayerSession): void {
  localStorage.setItem(PLAYER_SESSION_KEY, JSON.stringify({ roomCode, ...session }))
}

function clearPlayerSession(): void {
  localStorage.removeItem(PLAYER_SESSION_KEY)
}

type Status = 'idle' | 'connecting' | 'ready' | 'offline'

export default function JoinLobby() {
  const navigate = useNavigate()
  const { roomCode: paramCode } = useParams()
  const initialCode = (paramCode ?? '').toUpperCase()
  const socketRef = useRef<RealtimeSocket | null>(null)
  const [room, setRoom] = useState<PublicRoomState | null>(null)
  const [session, setSession] = useState<PlayerSession | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState<Avatar>(AVATARS[0]) // 🛹 as default
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const socket = createRealtimeClient()
    socketRef.current = socket

    socket.on('connect', () => {
      setStatus('ready')
      const saved = readPlayerSession()
      if (initialCode && saved?.roomCode === initialCode) {
        socket.emit('room:resume', saved)
      }
    })
    socket.on('disconnect', () => setStatus('offline'))

    socket.on('room:joined', ({ room: nextRoom, session: nextSession }) => {
      savePlayerSession(nextRoom.code, nextSession)
      setRoom(nextRoom)
      setSession(nextSession)
      setSubmitting(false)
    })

    socket.on('room:state', (nextRoom: PublicRoomState) => {
      setRoom(nextRoom)
    })

    socket.on('room:error', payload => {
      if (payload.code === 'SESSION_INVALID' || payload.code === 'ROOM_NOT_FOUND' || payload.code === 'ROOM_EXPIRED') {
        clearPlayerSession()
        setRoom(null)
        setSession(null)
        setError('')
      } else if (payload.code === 'ROOM_FULL') {
        setError('Cette salle est complète.')
        setSubmitting(false)
      } else {
        setError(payload.message)
        setSubmitting(false)
      }
    })

    socket.on('room:expired', payload => {
      if (payload.roomCode === initialCode) {
        clearPlayerSession()
        setRoom(null)
        setSession(null)
        setError('Cette salle a expiré.')
      }
    })

    socket.connect()
    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [initialCode, navigate])

  function validNickname(): boolean {
    const trimmed = nickname.trim()
    if (trimmed.length < 2 || trimmed.length > MAX_NICKNAME_LENGTH) {
      setError('Choisis un pseudo entre 2 et 18 caractères.')
      return false
    }
    if (!/^[\p{L}\p{N} ._-]+$/u.test(trimmed)) {
      setError('Utilise seulement des lettres, chiffres, espaces, points, tirets ou _.')
      return false
    }
    return true
  }

  function joinRoom(): void {
    if (!validNickname() || !socketRef.current?.connected) return
    setError('')
    setSubmitting(true)
    socketRef.current.emit('room:join', {
      roomCode: initialCode,
      nickname: nickname.trim(),
      avatar,
    })
  }

  function leaveRoom(): void {
    if (room) socketRef.current?.emit('room:leave', { roomCode: room.code })
    clearPlayerSession()
    navigate('/arcade')
  }

  if (session && room) {
    const playerNumber = room.players.findIndex(p => p.id === session.playerId) + 1
    return (
      <main className="min-h-screen bg-[#231F20] text-white flex flex-col items-center justify-center p-8">
        <p className="text-xs font-black tracking-[.3em] text-[#FBB040]">MDJ ARCADE</p>
        <h1 className="mt-2 text-center text-3xl sm:text-4xl font-black">
          Salle {room.code}
        </h1>

        <div className="mt-10">
          <p className="text-center text-lg font-black">
            Vous êtes connecté.
          </p>
          <p className="mt-4 text-center text-lg font-black">
            Joueur {playerNumber}
          </p>
          <p className="mt-6 text-center text-white/60">
            En attente du lancement du jeu...
          </p>
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

      <div className="mt-6 text-center text-white/60">
        {!initialCode && (
          <p>Entre le code de salle affiché sur la TV</p>
        )}
        {initialCode && (
          <p>Code: {initialCode}</p>
        )}
      </div>

      <div className="mt-8 w-full max-w-md">
        <p className="mb-2 text-sm font-black">Ton pseudo temporaire</p>
        <input
          value={nickname}
          onChange={e => setNickname(e.target.value.slice(0, MAX_NICKNAME_LENGTH))}
          maxLength={MAX_NICKNAME_LENGTH}
          placeholder="Ex. RDP_PLAYER"
          className="mt-2 min-h-14 w-full max-w-md rounded-2xl border border-white/15 bg-white/5 px-4 text-base font-bold outline-none focus:border-[#FBB040]"
        />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-black">Ton avatar</p>
        <div className="grid grid-cols-6 gap-2">
          {AVATARS.map(avatarOption => (
            <button
              key={avatarOption}
              type="button"
              onClick={() => setAvatar(avatarOption)}
              aria-label={`Avatar ${avatarOption}`}
              className={`min-h-12 rounded-xl border-2 text-2xl transition-transform active:scale-95 ${
                avatar === avatarOption
                  ? 'border-[#FBB040] bg-[#FBB040]/20 scale-105'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              {avatarOption}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={joinRoom}
        disabled={submitting || status !== 'ready'}
        className="mt-8 min-h-16 w-full max-w-md rounded-2xl bg-gradient-to-r from-[#FBB040] to-[#F05063] px-6 font-black text-white disabled:cursor-not-allowed disabled:opacity-50 active:scale-[.98] transition-all"
      >
        {submitting ? 'Connexion…' : 'Rejoindre la salle'}
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