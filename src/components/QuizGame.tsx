import { useState, useEffect } from 'react'
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Play, Star } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

type GameState = 'home' | 'playing' | 'result' | 'scores'

interface Question {
  question: string
  options: string[]
  correct: number
}

const questions: Question[] = [
  {
    question: 'Dans quel arrondissement de Montréal se trouve Rivière-des-Prairies?',
    options: ['Mercier–Hochelaga-Maisonneuve', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Saint-Laurent', 'Montréal-Nord'],
    correct: 1,
  },
  {
    question: 'Que signifie l\'acronyme "MDJ"?',
    options: ['Maison Des Jeunes', 'Mission Du Jeune', 'Mouvement Des Jeux', 'Maison Du Jeu'],
    correct: 0,
  },
  {
    question: 'Quelle rivière longe le quartier de Rivière-des-Prairies?',
    options: ['Le fleuve Saint-Laurent', 'La rivière des Prairies', 'La rivière Richelieu', 'La rivière des Outaouais'],
    correct: 1,
  },
  {
    question: 'Quel sport est le plus populaire dans les rues de RDP?',
    options: ['Le soccer', 'Le basketball', 'Le hockey', 'Le baseball'],
    correct: 2,
  },
  {
    question: 'La MDJ-RDP offre des services principalement pour quelle tranche d\'âge?',
    options: ['6 à 12 ans', '12 à 17 ans', '12 à 24 ans', '18 à 30 ans'],
    correct: 2,
  },
  {
    question: 'Comment appelle-t-on les habitants de Rivière-des-Prairies?',
    options: ['Les Prairiens', 'Les Rivièrains', 'Les Prairiois', 'Les Rivièrois'],
    correct: 0,
  },
  {
    question: 'Quel est le surnom populaire de Rivière-des-Prairies?',
    options: ['RDP', 'La Prairie', 'Le Plateau', 'L\'Est'],
    correct: 0,
  },
  {
    question: 'Quelle langue est principalement parlée à la MDJ-RDP?',
    options: ['Anglais', 'Espagnol', 'Français', 'Créole'],
    correct: 2,
  },
]

const TIMER_DURATION = 20

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function QuizGame() {
  const [gameState, setGameState]   = useState<GameState>('home')
  const [shuffled, setShuffled]     = useState<Question[]>([])
  const [current, setCurrent]       = useState(0)
  const [score, setScore]           = useState(0)
  const [timeLeft, setTimeLeft]     = useState(TIMER_DURATION)
  const [isAnswered, setIsAnswered] = useState(false)
  const [selected, setSelected]     = useState<number | null>(null)
  const [localScores, setLocalScores] = useState<{ name: string; score: number }[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('mdj_quiz_scores') || '[]')
    } catch {
      return []
    }
  })

  /* ── Timer ── */
  useEffect(() => {
    if (gameState !== 'playing' || isAnswered) return
    if (timeLeft <= 0) {
      handleAnswer(-1)
      return
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [gameState, isAnswered, timeLeft])

  function startGame() {
    setShuffled(shuffle(questions).slice(0, 6))
    setCurrent(0)
    setScore(0)
    setTimeLeft(TIMER_DURATION)
    setIsAnswered(false)
    setSelected(null)
    setGameState('playing')
  }

  function handleAnswer(idx: number) {
    if (isAnswered) return
    setIsAnswered(true)
    setSelected(idx)
    const correct = shuffled[current].correct
    if (idx === correct) {
      const bonus = Math.round((timeLeft / TIMER_DURATION) * 100)
      setScore(s => s + 100 + bonus)
    }
  }

  function nextQuestion() {
    if (current + 1 >= shuffled.length) {
      endGame()
      return
    }
    setCurrent(c => c + 1)
    setTimeLeft(TIMER_DURATION)
    setIsAnswered(false)
    setSelected(null)
  }

  function endGame() {
    const finalScore = score
    setLocalScores(prev => {
      const next = [...prev, { name: 'Joueur', score: finalScore }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
      localStorage.setItem('mdj_quiz_scores', JSON.stringify(next))
      return next
    })
    setGameState('result')
  }

  const q = shuffled[current]
  const timerPct = (timeLeft / TIMER_DURATION) * 100
  const timerColor = timeLeft > 10 ? BLUE : timeLeft > 5 ? ORANGE : PINK

  /* ══════════════════════════════
     HOME SCREEN
  ══════════════════════════════ */
  if (gameState === 'home') {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-white overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #111111 100%)' }}
      >
        {/* Blobs */}
        <div aria-hidden className="pointer-events-none absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl bg-[#FBB040]/15" />
        <div aria-hidden className="pointer-events-none absolute bottom-20 right-10 w-64 h-64 rounded-full blur-3xl bg-[#F05063]/15" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-[#00AEEF]/10" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
          {/* Icon */}
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
          >
            <Trophy size={48} strokeWidth={1.5} className="text-white" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">MDJ ARCADE</p>
          <h1 className="font-black text-4xl md:text-5xl leading-tight mb-4">
            Quiz{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${ORANGE}, ${PINK})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RDP
            </span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            Teste tes connaissances sur Rivière-des-Prairies, la MDJ et la culture québécoise!
          </p>

          {/* Stats row */}
          <div className="flex gap-6 mb-10">
            {[
              { label: '6 questions', icon: Star },
              { label: '20 sec / question', icon: Clock },
              { label: 'Score bonus', icon: Trophy },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={20} style={{ color: ORANGE }} />
                <span className="text-white/50 text-xs text-center">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={startGame}
            className="flex items-center justify-center gap-3 w-full min-h-[56px] rounded-2xl font-bold text-lg text-white shadow-lg transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
          >
            <Play size={22} />
            Jouer
          </button>

          <button
            onClick={() => setGameState('scores')}
            className="mt-4 text-white/40 text-sm underline underline-offset-2 hover:text-white/60 transition-colors"
          >
            Voir le classement
          </button>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════
     PLAYING SCREEN
  ══════════════════════════════ */
  if (gameState === 'playing' && q) {
    return (
      <div
        className="flex flex-col min-h-screen text-white overflow-hidden"
        style={{ background: '#1a1a1a' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-6 pb-4 shrink-0">
          <span className="text-white/50 text-sm font-semibold">
            {current + 1} / {shuffled.length}
          </span>
          <div className="flex items-center gap-2">
            <Clock size={16} style={{ color: timerColor }} />
            <span className="font-black text-xl tabular-nums" style={{ color: timerColor }}>
              {timeLeft}
            </span>
          </div>
          <span className="font-bold text-white/80">
            <span style={{ color: ORANGE }}>★</span> {score}
          </span>
        </div>

        {/* Timer bar */}
        <div className="h-1.5 bg-white/10 mx-4 rounded-full shrink-0">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-between px-4 py-6">
          <div
            className="rounded-3xl p-6 mb-6"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-semibold">
              Question {current + 1}
            </p>
            <p className="font-bold text-xl leading-snug text-white">{q.question}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              let bg = 'rgba(255,255,255,0.06)'
              let border = 'rgba(255,255,255,0.12)'
              let textColor = 'rgba(255,255,255,0.85)'

              if (isAnswered) {
                if (i === q.correct) {
                  bg = 'rgba(34,197,94,0.15)'
                  border = '#22c55e'
                  textColor = '#22c55e'
                } else if (i === selected && i !== q.correct) {
                  bg = 'rgba(240,80,99,0.15)'
                  border = PINK
                  textColor = PINK
                }
              } else if (selected === i) {
                bg = 'rgba(251,176,64,0.15)'
                border = ORANGE
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className="flex items-center gap-4 w-full min-h-[56px] rounded-2xl px-5 py-4 text-left font-semibold transition-all"
                  style={{
                    background: bg,
                    border: `2px solid ${border}`,
                    color: textColor,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm leading-snug">{opt}</span>
                  {isAnswered && i === q.correct && (
                    <CheckCircle size={20} className="shrink-0 text-green-400" />
                  )}
                  {isAnswered && i === selected && i !== q.correct && (
                    <XCircle size={20} className="shrink-0" style={{ color: PINK }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Next / feedback */}
          {isAnswered && (
            <div className="mt-6">
              <p className="text-center text-sm font-semibold mb-4" style={{ color: selected === q.correct ? '#22c55e' : PINK }}>
                {selected === q.correct
                  ? `Bravo! +${100 + Math.round((timeLeft / TIMER_DURATION) * 100)} pts`
                  : selected === -1
                  ? 'Temps écoulé!'
                  : 'Mauvaise réponse!'}
              </p>
              <button
                onClick={nextQuestion}
                className="w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
              >
                {current + 1 >= shuffled.length ? 'Voir mes résultats' : 'Question suivante →'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ══════════════════════════════
     RESULT SCREEN
  ══════════════════════════════ */
  if (gameState === 'result') {
    const maxScore = shuffled.length * 200
    const pct = Math.round((score / maxScore) * 100)
    const medal = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉'
    const msg   = pct >= 80 ? 'Exceptionnel!' : pct >= 50 ? 'Bien joué!' : 'Continue à pratiquer!'

    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-white overflow-hidden"
        style={{ background: '#1a1a1a' }}
      >
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
          <span className="text-6xl mb-4">{medal}</span>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold">Résultat final</p>
          <h2 className="font-black text-4xl text-white mb-2">{msg}</h2>

          {/* Score bubble */}
          <div
            className="rounded-3xl px-10 py-6 my-8 w-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)' }}
          >
            <p
              className="font-black text-6xl tabular-nums"
              style={{
                background: `linear-gradient(135deg, ${ORANGE}, ${PINK})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {score}
            </p>
            <p className="text-white/40 text-sm mt-1">points sur {maxScore} max</p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={startGame}
              className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
            >
              <RotateCcw size={18} />
              Rejouer
            </button>
            <button
              onClick={() => setGameState('scores')}
              className="w-full min-h-[56px] rounded-2xl font-semibold text-white/70 transition-colors hover:text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)' }}
            >
              Classement
            </button>
            <button
              onClick={() => setGameState('home')}
              className="text-white/40 text-sm underline underline-offset-2 hover:text-white/60 transition-colors mt-2"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════
     SCORES SCREEN
  ══════════════════════════════ */
  if (gameState === 'scores') {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-white overflow-hidden"
        style={{ background: '#1a1a1a' }}
      >
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
          >
            <Trophy size={32} className="text-white" />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold">MDJ ARCADE</p>
          <h2 className="font-black text-3xl text-white mb-8">Classement</h2>

          <div className="w-full flex flex-col gap-3 mb-10">
            {localScores.length === 0 ? (
              <p className="text-white/40 text-center mt-10">
                Aucun joueur enregistré. Joue pour apparaître ici!
              </p>
            ) : (
              localScores.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 min-h-[56px]"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="font-black text-xl w-8 shrink-0"
                    style={{
                      color: i === 0 ? ORANGE : i === 1 ? 'rgba(255,255,255,0.6)' : i === 2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-semibold text-white flex-1 text-left">{entry.name}</span>
                  <span className="font-bold text-white/60 text-sm tabular-nums">{entry.score} pts</span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setGameState('home')}
            className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
          >
            <Play size={18} />
            Jouer
          </button>
        </div>
      </div>
    )
  }

  return null
}
