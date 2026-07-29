interface TrikiModeScreenProps {
  onSelectMode: (mode: 'friend' | 'ai') => void
}

const BUTTON_CLASS =
  'bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white font-semibold hover:bg-white/20 min-h-[56px] transition-colors text-left'

export default function TrikiModeScreen({ onSelectMode }: TrikiModeScreenProps) {
  return (
    <div className="bg-[#231F20] min-h-screen flex flex-col items-center justify-center px-6">
      <span className="text-5xl mb-4">⭕❌</span>
      <h1 className="font-black text-4xl text-white">Triki MDJ</h1>
      <p className="text-white/60 mt-2">Aligne 3 symboles pour gagner!</p>
      <div className="flex flex-col gap-4 mt-10 w-full max-w-xs">
        <button className={BUTTON_CLASS} onClick={() => onSelectMode('friend')}>
          👥 Contre un ami
        </button>
        <button className={BUTTON_CLASS} onClick={() => onSelectMode('ai')}>
          🤖 Contre l'ordi
        </button>
      </div>
    </div>
  )
}
