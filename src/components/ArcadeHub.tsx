import { getTopAllScores } from '../lib/arcadeScores'
import type { GameScore } from '../lib/arcadeScores'

const GRADIENT = 'linear-gradient(135deg, #FBB040, #F05063, #29ABE2)'
const RANK_COLORS = ['#FBB040', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)']
const GAME_EMOJIS: Record<string, string> = { quiz: '🧠', triki: '⭕❌' }

const GAME_CARDS = [
  { id: 'quiz' as const, emoji: '🧠', title: 'Quiz MDJ', desc: '80 questions sur RDP, la culture et plus!' },
  { id: 'triki' as const, emoji: '⭕❌', title: 'Triki MDJ', desc: 'Le classique X et O. Défie tes amis ou l\'ordi!' },
]

interface ArcadeHubProps {
  onSelectGame: (game: 'quiz' | 'triki') => void
}

interface GameCardProps { emoji: string; title: string; desc: string; onPlay: () => void }

function GameCard({ emoji, title, desc, onPlay }: GameCardProps) {
  return (
    <div className="p-[2px] rounded-3xl" style={{ background: GRADIENT }}>
      <div className="bg-[#2a2020] rounded-[calc(1.5rem-2px)] p-8 text-center">
        <span className="text-5xl">{emoji}</span>
        <h3 className="font-black text-2xl text-white mt-3">{title}</h3>
        <p className="text-white/60 text-sm mt-2">{desc}</p>
        <button
          onClick={onPlay}
          className="mt-6 w-full min-h-[48px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #FBB040, #F05063)' }}
        >
          Jouer
        </button>
      </div>
    </div>
  )
}

function LeaderboardRow({ entry, rank }: { entry: GameScore; rank: number }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/10">
      <span className="font-black text-lg w-6 shrink-0" style={{ color: RANK_COLORS[rank] ?? 'rgba(255,255,255,0.6)' }}>
        {rank + 1}
      </span>
      <span className="flex-1 text-white font-semibold truncate">{entry.name}</span>
      <span className="text-lg">{GAME_EMOJIS[entry.game] ?? '🎮'}</span>
      <span className="font-bold tabular-nums" style={{ color: '#FBB040' }}>{entry.score} pts</span>
    </div>
  )
}

function GlobalLeaderboard() {
  const topScores = getTopAllScores(5)
  return (
    <div className="mt-12 max-w-md mx-auto px-6 pb-12">
      <h2 className="font-black text-xl text-white text-center mb-6">🏆 Top 5 — Tous les jeux</h2>
      {topScores.length === 0 && (
        <p className="text-white/40 text-center text-sm">Aucun score enregistré. Joue pour apparaître ici!</p>
      )}
      {topScores.map((entry, i) => (
        <LeaderboardRow key={`${entry.name}-${entry.game}-${i}`} entry={entry} rank={i} />
      ))}
    </div>
  )
}

export default function ArcadeHub({ onSelectGame }: ArcadeHubProps) {
  return (
    <div className="bg-[#231F20] min-h-screen">
      <div className="text-center pt-10 px-6">
        <h1 className="font-black text-4xl text-white">
          MDJ{' '}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Arcade
          </span>
        </h1>
        <p className="text-white/60 mt-2">Choisis ton jeu!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto p-6 mt-8">
        {GAME_CARDS.map(game => (
          <GameCard key={game.id} emoji={game.emoji} title={game.title} desc={game.desc} onPlay={() => onSelectGame(game.id)} />
        ))}
      </div>
      <GlobalLeaderboard />
    </div>
  )
}
