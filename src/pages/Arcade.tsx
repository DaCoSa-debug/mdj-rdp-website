import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import QuizGame from '../components/QuizGame'
import TrikiGame from '../components/TrikiGame'
import ArcadeHub from '../components/ArcadeHub'

type SelectedGame = 'quiz' | 'triki' | null

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 hover:text-white text-sm font-semibold transition-colors border border-white/20"
    >
      ← Retour aux jeux
    </button>
  )
}

export default function Arcade() {
  const [selectedGame, setSelectedGame] = useState<SelectedGame>(null)

  const exitGame = () => setSelectedGame(null)

  return (
    <>
      <Header />
      <section className="bg-[#231F20] min-h-screen">
        {selectedGame !== null && <BackButton onBack={exitGame} />}
        {selectedGame === null && <ArcadeHub onSelectGame={setSelectedGame} />}
        {selectedGame === 'quiz' && <QuizGame />}
        {selectedGame === 'triki' && <TrikiGame />}
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
