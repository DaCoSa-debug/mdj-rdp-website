import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { getPlayerGameScore, getTopRanking, getSessionName, startSession } from '../lib/arcadeScores'
import type { PlayerRank } from '../lib/arcadeScores'
import NameEditor from './NameEditor'

const GRADIENT = 'linear-gradient(135deg, #FBB040, #F05063, #29ABE2)'
const RANK_COLORS = ['#FBB040', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)']
type GameId = 'quiz' | 'triki' | 'rdp-run' | 'snake' | 'rdp-blocs'

const GAME_CARDS = [
  { id: 'rdp-run' as GameId, emoji: '🏃', title: 'RDP Run', desc: 'Cours dans RDP, évite les obstacles et attrape les pièces!', meta: 'Record hebdomadaire' },
  { id: 'quiz' as GameId, emoji: '🧠', title: 'Quiz MDJ', desc: '80 questions sur RDP, la culture et plus!', meta: 'Meilleur Quiz' },
  { id: 'triki' as GameId, emoji: '⭕❌', title: 'Triki MDJ', desc: 'Le classique X et O. Défie tes amis ou l\'ordi!', meta: 'Victoires contre IA' },
  { id: 'snake' as GameId, emoji: '🐍', title: 'Snake MDJ', desc: 'Le classique rétro. Mange, grandis et évite ta queue!', meta: 'Record hebdomadaire' },
  { id: 'rdp-blocs' as GameId, emoji: '🧩', title: 'RDP Blocs', desc: 'Assemble les tuiles du quartier et complète les lignes!', meta: 'Record hebdomadaire' },
]

interface ArcadeHubProps {
  onSelectGame: (game: GameId) => void
  onEndSession: () => void
}

function GamePreview({ game }: { game: GameId }) {
  if (game === 'rdp-run') return <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-b from-[#29ABE2] to-[#8DC63F]"><span className="absolute right-7 top-4 text-xl">☀️</span><span className="absolute left-8 bottom-6 text-3xl">🏃</span><span className="absolute left-1/2 bottom-8 text-lg">🪙</span><span className="absolute right-10 bottom-5 text-2xl">🚧</span><div className="absolute inset-x-0 bottom-0 h-5 bg-[#25313b]" /></div>
  if (game === 'quiz') return <div className="flex h-28 flex-col justify-center rounded-2xl bg-gradient-to-br from-[#F7941E] via-[#F05063] to-[#29ABE2] p-4 text-left"><span className="text-xs font-black text-white/70">QUESTION MDJ</span><span className="mt-1 h-3 w-4/5 rounded bg-white/90" /><div className="mt-3 flex gap-2"><i className="h-5 flex-1 rounded bg-white/70" /><i className="h-5 flex-1 rounded bg-white/40" /></div></div>
  if (game === 'triki') return <div className="grid h-28 grid-cols-3 gap-1 rounded-2xl bg-[#231F20] p-4">{['❌', '', '⭕', '', '❌', '', '⭕', '', '❌'].map((symbol, index) => <span key={index} className="flex items-center justify-center rounded bg-white/10 text-xl">{symbol}</span>)}</div>
  if (game === 'snake') return <div className="relative h-28 overflow-hidden rounded-2xl bg-[#9bbc0f]" style={{ backgroundImage: 'linear-gradient(rgba(15,56,15,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,56,15,.12) 1px, transparent 1px)', backgroundSize: '14px 14px' }}><span className="absolute left-8 top-9 text-3xl text-[#0f380f]">●●●</span><span className="absolute right-10 top-5 text-[#0f380f]">■</span></div>
  return <div className="grid h-28 grid-cols-8 gap-1 rounded-2xl bg-[#18222c] p-3">{Array.from({ length: 32 }, (_, index) => <i key={index} className={`rounded-sm ${[2, 3, 10, 11, 18, 19, 20, 27].includes(index) ? 'bg-[#FBB040]' : [13, 21, 29].includes(index) ? 'bg-[#F05063]' : 'bg-white/5'}`} />)}</div>
}

interface GameCardProps { id: GameId; emoji: string; title: string; desc: string; meta: string; record: number; onPlay: () => void; disabled?: boolean }

function GameCard({ id, emoji, title, desc, meta, record, onPlay, disabled = false }: GameCardProps) {
  const buttonClass = `mt-6 w-full min-h-[48px] rounded-2xl font-bold text-white transition-opacity ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'}`
  return (
    <div className="p-[2px] rounded-3xl" style={{ background: GRADIENT }}>
      <div className="bg-[#2a2020] rounded-[calc(1.5rem-2px)] p-7 text-center sm:p-8">
        <div className="relative"><GamePreview game={id} /><span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#2a2020] bg-[#231F20] px-3 py-1 text-2xl">{emoji}</span></div>
        <h3 className="mt-7 font-black text-2xl text-white">{title}</h3>
        <p className="text-white/60 text-sm mt-2">{desc}</p>
        <div className="mt-5 rounded-2xl bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">{meta}</p>
          <p className="mt-1 font-black text-[#FBB040]">{record} {title === 'Triki MDJ' ? 'victoires' : 'pts'}</p>
        </div>
        <button
          onClick={disabled ? undefined : onPlay}
          disabled={disabled}
          className={buttonClass}
          style={{ background: 'linear-gradient(135deg, #FBB040, #F05063)' }}
        >
          Jouer
        </button>
      </div>
    </div>
  )
}

interface PlayerNameBarProps { name: string; onEdit: () => void }

function PlayerNameBar({ name, onEdit }: PlayerNameBarProps) {
  if (!name) {
    return (
      <button onClick={onEdit} className="bg-white/10 rounded-full px-6 py-2 text-white/80 text-sm hover:bg-white/20 transition-colors">
        Choisir mon pseudo
      </button>
    )
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-white font-semibold">Pseudo: {name}</span>
      <button onClick={onEdit} aria-label="Modifier le nom">
        <Pencil className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
      </button>
    </div>
  )
}

function LeaderboardRow({ entry, rank }: { entry: PlayerRank; rank: number }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/10">
      <span className="font-black text-lg w-6 shrink-0" style={{ color: RANK_COLORS[rank] ?? 'rgba(255,255,255,0.6)' }}>
        {rank + 1}
      </span>
      <span className="flex-1 text-white font-semibold truncate">{entry.name}</span>
      <span className="font-bold tabular-nums" style={{ color: '#FBB040' }}>{entry.totalScore} pts</span>
    </div>
  )
}

function GlobalLeaderboard() {
  const topScores = getTopRanking(5)
  return (
    <div className="mt-12 max-w-md mx-auto px-6 pb-12">
      <p className="text-center text-xs font-bold uppercase tracking-[.2em] text-white/40">Cette semaine</p>
      <h2 className="font-black text-xl text-white text-center mb-6">🏆 Top 5 — XP Arcade</h2>
      {topScores.length === 0 && (
        <p className="text-white/40 text-center text-sm">Aucun score enregistré. Joue pour apparaître ici!</p>
      )}
      {topScores.map((entry, i) => (
        <LeaderboardRow key={`${entry.name}-${i}`} entry={entry} rank={i} />
      ))}
    </div>
  )
}

export default function ArcadeHub({ onSelectGame, onEndSession }: ArcadeHubProps) {
  const [playerName, setLocalName] = useState<string>(getSessionName)
  const [editingName, setEditingName] = useState(false)

  function handleSaveName(newName: string): void {
    startSession(newName)
    setLocalName(newName)
    setEditingName(false)
  }

  if (editingName) {
    return (
      <div className="bg-[#231F20] min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="font-black text-3xl text-white mb-8">Ton pseudo</h2>
        <NameEditor currentName={playerName} onSave={handleSaveName} onCancel={() => setEditingName(false)} />
      </div>
    )
  }

  return (
    <div className="bg-[#231F20] min-h-screen">
      <div className="text-center pt-10 px-6">
        <h1 className="font-black text-4xl text-white">
          MDJ{' '}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Arcade
          </span>
        </h1>
        <p className="text-white/60 mt-2">Choisis ton jeu et bats tes records!</p>
        <div className="mt-4">
          <PlayerNameBar name={playerName} onEdit={() => setEditingName(true)} />
        </div>
        {!playerName && <p className="text-white/40 text-sm mt-3">↑ Choisis un pseudo pour jouer</p>}
      </div>
      <div className="mx-auto mt-7 max-w-5xl px-6">
        <div className="rounded-3xl border border-[#FBB040]/40 bg-[#FBB040]/10 px-6 py-5 text-center">
          <p className="text-xs font-black tracking-[.2em] text-[#FBB040]">DÉFI DE LA SEMAINE</p>
          <p className="mt-1 text-xl font-black text-white">RDP Run — atteins 2 500 points</p>
          <p className="mt-1 text-sm text-white/60">Les classements et XP se réinitialisent chaque dimanche à 20 h.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mx-auto mt-2 max-w-5xl p-6 sm:grid-cols-3">
        {GAME_CARDS.map(game => (
          <GameCard
            key={game.id}
            id={game.id}
            emoji={game.emoji}
            title={game.title}
            desc={game.desc}
            meta={game.meta}
            record={playerName ? getPlayerGameScore(game.id, playerName) : 0}
            onPlay={() => onSelectGame(game.id)}
            disabled={!playerName}
          />
        ))}
      </div>
      <GlobalLeaderboard />
      <button
        onClick={onEndSession}
        className="block mx-auto mt-4 pb-8 text-white/40 text-sm underline underline-offset-2 hover:text-white/60 transition-colors text-center"
      >
        Quitter la session (mon score reste au classement)
      </button>
    </div>
  )
}
