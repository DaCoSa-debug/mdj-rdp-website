import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import type { Avatar, BattleState, PlayerSession, PublicRoomState } from '../../shared/multiplayerProtocol'
import { AVATARS, EMOTES } from '../../shared/multiplayerProtocol'
import { createRealtimeClient, publicAppOrigin, type RealtimeSocket } from '../multiplayer/realtimeClient'

const SESSION_KEY = 'mdj-multiplayer-session'
const MAX_NICKNAME_LENGTH = 18

type SavedSession = PlayerSession & { roomCode: string }

function readSession(): SavedSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as SavedSession
    return session.roomCode && session.playerId && session.sessionToken ? session : null
  } catch { return null }
}

function saveSession(roomCode: string, session: PlayerSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ roomCode, ...session }))
}

function clearSession(): void { localStorage.removeItem(SESSION_KEY) }

function AvatarPicker({ value, onChange }: { value: Avatar; onChange: (avatar: Avatar) => void }) {
  return (
    <div className="grid grid-cols-6 gap-2" aria-label="Choisis ton avatar">
      {AVATARS.map(avatar => (
        <button key={avatar} type="button" onClick={() => onChange(avatar)} aria-label={`Avatar ${avatar}`} className={`min-h-12 rounded-xl border-2 text-2xl transition-transform active:scale-95 ${value === avatar ? 'border-[#FBB040] bg-[#FBB040]/20 scale-105' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
          {avatar}
        </button>
      ))}
    </div>
  )
}

function BattleBoard({ cells, target, active, onFire }: { cells: Record<number, 'ship' | 'hit' | 'miss'>; target?: boolean; active?: boolean; onFire?: (cell: number) => void }) {
  return <div className="grid grid-cols-10 gap-1 rounded-2xl bg-[#081b31] p-2 shadow-inner">
    {Array.from({ length: 100 }, (_, cell) => {
      const value = cells[cell]
      const color = value === 'ship' ? 'bg-[#29ABE2] shadow-[inset_0_-2px_0_rgba(0,0,0,.18)]' : value === 'hit' ? 'battle-hit bg-[#F05063]' : value === 'miss' ? 'battle-miss bg-white/25' : 'bg-[#123452] hover:bg-[#1d5a87]'
      return <button key={cell} disabled={!target || !active || Boolean(value)} onClick={() => onFire?.(cell)} aria-label={`Case ${cell}`} className={`aspect-square min-h-0 rounded-[3px] transition-all ${color} disabled:cursor-default`} />
    })}
  </div>
}

export default function BattleshipLobby() {
  const navigate = useNavigate()
  const { roomCode: paramCode } = useParams()
  const initialCode = (paramCode ?? '').toUpperCase()
  const socketRef = useRef<RealtimeSocket | null>(null)
  const activeRoomCodeRef = useRef(initialCode)
  const [roomCode, setRoomCode] = useState(initialCode)
  const [room, setRoom] = useState<PublicRoomState | null>(null)
  const [session, setSession] = useState<PlayerSession | null>(null)
  const [battle, setBattle] = useState<BattleState | null>(null)
  const [effect, setEffect] = useState('')
  const [emote, setEmote] = useState('')
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState<Avatar>('🎮')
  const [manualCode, setManualCode] = useState('')
  const [showManualJoin, setShowManualJoin] = useState(false)
  const [status, setStatus] = useState<'connecting' | 'ready' | 'offline'>('connecting')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { setRoomCode(initialCode); activeRoomCodeRef.current = initialCode }, [initialCode])

  useEffect(() => {
    const socket = createRealtimeClient()
    socketRef.current = socket
    socket.on('connect', () => {
      setStatus('ready')
      const saved = readSession()
      if (initialCode && saved?.roomCode === initialCode) socket.emit('room:resume', saved)
    })
    socket.on('disconnect', () => setStatus('offline'))
    socket.on('room:created', ({ room: nextRoom, session }) => {
      saveSession(nextRoom.code, session)
      setSession(session)
      setRoom(nextRoom)
      setRoomCode(nextRoom.code); activeRoomCodeRef.current = nextRoom.code
      setSubmitting(false)
      navigate(`/arcade/battleship/join/${nextRoom.code}`, { replace: true })
    })
    socket.on('room:joined', ({ room: nextRoom, session }) => {
      saveSession(nextRoom.code, session)
      setSession(session)
      setRoom(nextRoom)
      setSubmitting(false)
    })
    socket.on('room:state', setRoom)
    socket.on('game:state', setBattle)
    socket.on('game:effect', payload => { setEffect(payload.type === 'hit' ? '💥 TOUCHÉ !' : payload.type === 'miss' ? '🌊 À L’EAU !' : payload.type === 'win' ? '🏆 VICTOIRE !' : 'À TOI !'); window.setTimeout(() => setEffect(''), 1500) })
    socket.on('game:emote', payload => { setEmote(`${payload.nickname} ${payload.emoji}`); window.setTimeout(() => setEmote(''), 1800) })
    socket.on('room:error', payload => { setError(payload.message); setSubmitting(false) })
    socket.on('room:expired', payload => {
      if (payload.roomCode === activeRoomCodeRef.current) { clearSession(); setRoom(null); setError('Cette salle a expiré. Crée une nouvelle partie.'); setSubmitting(false) }
    })
    socket.connect()
    return () => { socket.disconnect(); socketRef.current = null }
  }, [initialCode, navigate])

  const inviteUrl = room ? `${publicAppOrigin()}/arcade/battleship/join/${room.code}` : ''
  const hasRoomTarget = Boolean(roomCode)

  function validNickname(): boolean {
    const trimmed = nickname.trim()
    if (trimmed.length < 2 || trimmed.length > MAX_NICKNAME_LENGTH) { setError('Choisis un pseudo entre 2 et 18 caractères.'); return false }
    if (!/^[\p{L}\p{N} ._-]+$/u.test(trimmed)) { setError('Utilise seulement des lettres, chiffres, espaces, points, tirets ou _.'); return false }
    return true
  }

  function createRoom(): void {
    if (!validNickname() || !socketRef.current?.connected) return
    setError(''); setSubmitting(true)
    socketRef.current.emit('room:create', { gameType: 'battleship', nickname: nickname.trim(), avatar })
  }

  function joinRoom(): void {
    if (!validNickname() || !socketRef.current?.connected || !roomCode) return
    setError(''); setSubmitting(true)
    socketRef.current.emit('room:join', { roomCode, nickname: nickname.trim(), avatar })
  }

  function openManualRoom(): void {
    const code = manualCode.trim().toUpperCase()
    if (!/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/.test(code)) { setError('Entre le code de 6 caractères reçu.'); return }
    navigate(`/arcade/battleship/join/${code}`)
  }

  function leaveRoom(): void {
    if (room) socketRef.current?.emit('room:leave', { roomCode: room.code })
    clearSession()
    navigate('/arcade')
  }

  function readyForBattle(): void { if (room) socketRef.current?.emit('game:ready', { roomCode: room.code }) }
  function fire(cell: number): void { if (room) socketRef.current?.emit('game:fire', { roomCode: room.code, cell }) }
  function sendEmote(emoji: (typeof EMOTES)[number]): void { if (room) socketRef.current?.emit('game:emote', { roomCode: room.code, emoji }) }

  if (room) {
    const full = room.players.length === 2 && room.players.every(player => player.connected)
    const won = battle?.winnerId === session?.playerId
    const me = room.players.find(player => player.id === session?.playerId)
    const opponent = room.players.find(player => player.id !== session?.playerId)
    return <main className="min-h-screen bg-[#231F20] px-4 py-7 text-white sm:px-6"><div className="mx-auto w-full max-w-2xl"><Link to="/arcade" onClick={leaveRoom} className="text-sm font-bold text-white/65 hover:text-white">← Retour à l’arcade</Link><section className="mt-6 rounded-[2rem] border border-[#29ABE2]/25 bg-[#2a2020] p-5 shadow-2xl sm:p-8"><p className="text-center text-xs font-black tracking-[.22em] text-[#F05063]">BATAILLE NAVALE · MDJ</p><h1 className="mt-2 text-center text-3xl font-black sm:text-4xl">Salle {room.code}</h1><div className={`mt-5 rounded-2xl px-4 py-3 text-center font-black ${full ? 'bg-[#29ABE2]/15 text-[#9edfff]' : 'bg-white/5 text-white/75'}`}>{full ? '2/2 joueurs connectés' : `${room.players.length}/2 joueurs connectés`}</div>{!full && <div className="mt-6 rounded-2xl bg-white p-4 text-center text-[#231F20]"><p className="mb-3 text-sm font-bold">Invite un ami avec ce QR ou le code.</p><div className="mx-auto w-fit rounded-xl bg-white p-2"><QRCodeSVG value={inviteUrl} size={180} level="M" includeMargin /></div><p className="mt-3 font-mono text-2xl font-black tracking-[.28em]">{room.code}</p></div>}{full && (!battle || !battle.yourFleetReady) && <div className="mt-6 text-center"><div className="rounded-2xl bg-[#29ABE2]/10 p-5 text-left text-base leading-relaxed text-white/85"><p className="font-black tracking-wide text-[#9edfff]">COMMENT JOUER SUR MOBILE</p><p className="mt-2">1. Prépare ta flotte. 2. Attends ton tour. 3. Touche une case du tableau adverse pour tirer.</p></div><button onClick={readyForBattle} className="mt-5 min-h-14 rounded-2xl bg-gradient-to-r from-[#29ABE2] to-[#F05063] px-7 font-black active:scale-[.98]">PLACER MES NAVIRES</button></div>}{battle && <div className="mt-6"><p className={`rounded-xl px-4 py-3 text-center text-base font-black ${battle.phase === 'finished' ? 'bg-[#F05063]/20 text-[#ffb1ba]' : battle.yourTurn ? 'bg-[#29ABE2]/20 text-[#9edfff]' : 'bg-white/5 text-white/55'}`}>{battle.phase === 'placement' ? 'Flotte prête — attends ton adversaire…' : battle.phase === 'finished' ? (won ? '🏆 Tu as gagné !' : '💥 Ton adversaire gagne cette manche.') : battle.yourTurn ? 'À TOI DE JOUER' : 'Tour de ton adversaire…'}</p><div className="relative mt-2 min-h-10" aria-live="polite"><p className={`absolute inset-x-0 text-center text-2xl font-black text-[#FBB040] transition-all ${effect ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>{effect || '…'}</p><p className={`absolute inset-x-0 text-center text-2xl font-black text-white transition-all ${emote ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>{emote || '…'}</p></div><div className="mt-2 flex justify-center gap-2">{EMOTES.map(emoji => <button key={emoji} onClick={() => sendEmote(emoji)} className="min-h-11 min-w-11 rounded-xl bg-white/10 text-xl active:scale-90">{emoji}</button>)}</div><div className="mt-5 grid gap-5 md:grid-cols-2"><div><p className="mb-2 text-sm font-black tracking-widest text-[#29ABE2]">{me?.nickname ?? 'TOI'} · TES NAVIRES</p><BattleBoard cells={battle.yourBoard} /></div><div><p className="mb-2 text-sm font-black tracking-widest text-[#F05063]">{opponent?.nickname ?? 'ADVERSAIRE'} · À VISER</p><BattleBoard cells={battle.targetBoard} target active={battle.phase === 'playing' && battle.yourTurn} onFire={fire} /></div></div><div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm font-bold"><span className="rounded-xl bg-[#29ABE2]/20 px-2 py-3 text-[#9edfff]">BLEU<br />Navire</span><span className="rounded-xl bg-[#F05063]/20 px-2 py-3 text-[#ffb1ba]">ROUGE<br />Touché</span><span className="rounded-xl bg-white/10 px-2 py-3 text-white/75">GRIS<br />À l’eau</span></div></div>}<button onClick={leaveRoom} className="mt-6 min-h-12 w-full rounded-2xl border border-white/20 font-black text-white/75 hover:bg-white/10">Quitter la salle</button></section></div></main>
  }

  return <main className="min-h-screen bg-[#231F20] px-4 py-7 text-white sm:px-6"><div className="mx-auto w-full max-w-md"><Link to="/arcade" className="text-sm font-bold text-white/65 hover:text-white">← Retour à l’arcade</Link><section className="mt-6 rounded-[2rem] border border-white/10 bg-[#2a2020] p-5 shadow-2xl sm:p-8"><p className="text-center text-xs font-black tracking-[.22em] text-[#FBB040]">MULTIJOUEUR · PROTOTYPE</p><h1 className="mt-2 text-center text-3xl font-black sm:text-4xl">Bataille navale</h1><p className="mt-3 text-center text-sm text-white/60">Crée une salle privée ou rejoins un ami. Aucun compte requis.</p>{!hasRoomTarget && !showManualJoin && <div className="mt-7 grid gap-3"><button onClick={() => setShowManualJoin(true)} className="min-h-14 rounded-2xl border-2 border-[#29ABE2] font-black text-[#8ed9ff] active:scale-[.98]">J’ai un code de salle</button></div>}{(!hasRoomTarget && showManualJoin) && <div className="mt-6"><label className="text-sm font-bold">Code de salle</label><input value={manualCode} onChange={event => setManualCode(event.target.value.toUpperCase())} maxLength={6} placeholder="ABC123" className="mt-2 min-h-14 w-full rounded-2xl border border-white/15 bg-white/5 px-4 font-mono text-xl font-black tracking-[.25em] uppercase outline-none focus:border-[#29ABE2]" /><button onClick={openManualRoom} className="mt-3 min-h-14 w-full rounded-2xl bg-[#29ABE2] font-black text-[#231F20] active:scale-[.98]">Continuer</button></div>}{(hasRoomTarget || !showManualJoin) && <div className="mt-7"><p className="mb-2 text-sm font-bold">{hasRoomTarget ? `Rejoindre la salle ${roomCode}` : 'Créer une salle'}</p><label className="text-sm font-bold" htmlFor="nickname">Ton pseudo temporaire</label><input id="nickname" value={nickname} onChange={event => setNickname(event.target.value.slice(0, MAX_NICKNAME_LENGTH))} maxLength={MAX_NICKNAME_LENGTH} placeholder="Ex. RDP_KING" className="mt-2 min-h-14 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-base font-bold outline-none focus:border-[#FBB040]" /><p className="mt-4 text-sm font-bold">Ton avatar</p><div className="mt-2"><AvatarPicker value={avatar} onChange={setAvatar} /></div><button disabled={submitting || status !== 'ready'} onClick={hasRoomTarget ? joinRoom : createRoom} className="mt-6 min-h-14 w-full rounded-2xl bg-gradient-to-r from-[#FBB040] to-[#F05063] px-5 font-black text-white disabled:cursor-not-allowed disabled:opacity-50 active:scale-[.98]">{submitting ? 'Connexion…' : hasRoomTarget ? 'Rejoindre la salle' : 'Créer ma salle'}</button></div>}{error && <p role="alert" className="mt-4 rounded-xl bg-[#F05063]/15 px-4 py-3 text-center text-sm font-semibold text-[#ffb0b9]">{error}</p>}<p className="mt-5 text-center text-xs text-white/40">{status === 'ready' ? '● Serveur connecté' : status === 'offline' ? '● Serveur indisponible' : '● Connexion au serveur…'}</p></section></div></main>
}
