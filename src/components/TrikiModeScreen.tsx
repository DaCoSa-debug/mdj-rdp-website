import { useState } from 'react'
import type { Difficulty } from '../lib/trikiLogic'

interface TrikiModeScreenProps {
  onSelectMode: (mode: 'friend') => void
  onSelectAi: (difficulty: Difficulty) => void
}

interface DifficultyScreenProps {
  onSelectAi: (difficulty: Difficulty) => void
  onBack: () => void
}

const BUTTON_CLASS =
  'bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white font-semibold hover:bg-white/20 min-h-[56px] transition-colors text-left'

const HIGHLIGHT_CLASS =
  'bg-white/10 border border-[#8DC63F] rounded-2xl px-6 py-4 text-white font-semibold hover:bg-white/20 min-h-[56px] transition-colors text-left'

function DifficultyScreen({ onSelectAi, onBack }: DifficultyScreenProps) {
  return (
    <div className="bg-[#231F20] min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="sr-only">Triki MDJ</h1>
      <span className="text-5xl mb-4">🤖</span>
      <h2 className="font-black text-3xl text-white mb-2">Difficulté</h2>
      <p className="text-white/60 mb-10">Choisis ton adversaire</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className={HIGHLIGHT_CLASS} onClick={() => onSelectAi('facile')}>😊 Facile</button>
        <button className={BUTTON_CLASS} onClick={() => onSelectAi('moyen')}>😐 Moyen</button>
        <button className={BUTTON_CLASS} onClick={() => onSelectAi('difficile')}>😈 Difficile</button>
        <button className="text-white/60 mt-4 text-sm hover:text-white transition-colors" onClick={onBack}>
          ← Retour
        </button>
      </div>
    </div>
  )
}

export default function TrikiModeScreen({ onSelectMode, onSelectAi }: TrikiModeScreenProps) {
  const [showDifficulty, setShowDifficulty] = useState(false)

  if (showDifficulty) {
    return <DifficultyScreen onSelectAi={onSelectAi} onBack={() => setShowDifficulty(false)} />
  }

  return (
    <div className="bg-[#231F20] min-h-screen flex flex-col items-center justify-center px-6">
      <span className="text-5xl mb-4">⭕❌</span>
      <h1 className="font-black text-4xl text-white">Triki MDJ</h1>
      <p className="text-white/60 mt-2">Aligne 3 symboles pour gagner!</p>
      <div className="flex flex-col gap-4 mt-10 w-full max-w-xs">
        <button className={BUTTON_CLASS} onClick={() => onSelectMode('friend')}>
          👥 Contre un ami
        </button>
        <button className={BUTTON_CLASS} onClick={() => setShowDifficulty(true)}>
          🤖 Contre l'ordi
        </button>
      </div>
    </div>
  )
}
