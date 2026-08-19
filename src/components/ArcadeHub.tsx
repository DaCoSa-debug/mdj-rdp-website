import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { getPlayerGameScore, getTopRanking, getSessionName, startSession } from '../lib/arcadeScores'
import type { PlayerRank } from '../lib/arcadeScores'
import NameEditor from './NameEditor'

const GRADIENT = 'linear-gradient(135deg, #FBB040, #F05063, #29ABE2)'
const RANK_COLORS = ['#FBB040', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)']

const GAME_CARDS = [
  { id: 'rdp-run' as const, emoji: '🏃', title: 'RDP Run', desc: 'Cours dans RDP, évite les obstacles et attrape les pièces!', meta: 'Record hebdomadaire' },
  { id: 'quiz' as const, emoji: '🧠', title: 'Quiz MDJ', desc: '80 questions sur RDP, la culture et plus!', meta: 'Meilleur Quiz' },
  { id: 'triki' as const, emoji: '⭕❌', title: 'Triki MDJ', desc: 'Le classique X et O. Défie tes amis ou l\'ordi!', meta: 'Victoires contre IA' },
  { id: 'snake' as const, emoji: '🐍', title: 'Snake MDJ', desc: 'Le classique rétro. Mange, grandis et évite ta queue!', meta: 'Record hebdomadaire' },
]

interface ArcadeHubProps {
  onSelectGame: (game: 'quiz' | 'triki' | 'rdp-run' | 'snake') => void
  onEndSession: () => void
}

interface GameCardProps { emoji: string; title: string; desc: string; meta: string; record: number; onPlay: () => void; disabled?: boolean }

function GameCard({ emoji, title, desc, meta, record, onPlay, disabled = false }: GameCardProps) {
  const buttonClass = `mt-6 w-full min-h-[48px] rounded-2xl font-bold text-white transition-opacity ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'}`
  return (
    <div className="p-[2px] rounded-3xl" style={{ background: GRADIENT }}>
      <div className="bg-[#2a2020] rounded-[calc(1.5rem-2px)] p-7 text-center sm:p-8">
        <span className="text-5xl">{emoji}</span>
        <h3 className="font-black text-2xl text-white mt-3">{title}</h3>
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
