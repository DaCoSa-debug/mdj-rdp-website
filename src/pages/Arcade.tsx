import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import QuizGame from '../components/QuizGame'
import TrikiGame from '../components/TrikiGame'
import ArcadeHub from '../components/ArcadeHub'
import RdpRun from '../components/RdpRun'
import SnakeGame from '../components/SnakeGame'
import NameEditor from '../components/NameEditor'
import { getSessionName, startSession, endSession } from '../lib/arcadeScores'

type SelectedGame = 'quiz' | 'triki' | 'rdp-run' | 'snake' | null

const GRADIENT = 'linear-gradient(135deg, #FBB040, #F05063, #29ABE2)'

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

function SessionEntryScreen({ onStart }: { onStart: (name: string) => void }) {
  return (
    <div className="bg-[#231F20] min-h-screen flex flex-col items-center justify-center px-6">
      <img src="/mdj-logo-white.png" className="h-16 mx-auto mb-6" alt="MDJ-RDP" />
      <h1 className="font-black text-4xl text-white text-center">
        MDJ{' '}
        <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Arcade
        </span>
      </h1>
      <p className="text-white/60 text-center mt-2 mb-8">Choisis un pseudo pour commencer à jouer!</p>
      <NameEditor currentName="" onSave={onStart} />
    </div>
  )
}

export default function Arcade() {
  const [sessionName, setSessionName] = useState<string>(getSessionName)
  const [selectedGame, setSelectedGame] = useState<SelectedGame>(null)

  function handleStartSession(name: string): void {
    startSession(name)
    setSessionName(name)
  }

  function handleEndSession(): void {
    endSession()
    setSessionName('')
    setSelectedGame(null)
  }

  const exitGame = () => setSelectedGame(null)

  if (!sessionName) {
    return (
      <>
        <Header />
        <section className="bg-[#231F20] min-h-screen">
          <SessionEntryScreen onStart={handleStartSession} />
        </section>
        <Footer />
        <WhatsAppButton />
      </>
    )
  }

  return (
    <>
      <Header />
      <section className="bg-[#231F20] min-h-screen">
        {selectedGame !== null && <BackButton onBack={exitGame} />}
        {selectedGame === null && <ArcadeHub onSelectGame={setSelectedGame} onEndSession={handleEndSession} />}
        {selectedGame === 'quiz' && <QuizGame />}
        {selectedGame === 'triki' && <TrikiGame />}
        {selectedGame === 'rdp-run' && <RdpRun onExit={exitGame} />}
        {selectedGame === 'snake' && <SnakeGame onExit={exitGame} />}
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
