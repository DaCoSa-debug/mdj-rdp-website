import { useState, useEffect } from 'react'
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react'

/* ── Brand palette ─────────────────────────────────────────────── */
const BRAND = {
  pink:   '#F05063',
  orange: '#F7941E',
  yellow: '#FBB040',
  green:  '#8DC63F',
  blue:   '#29ABE2',
  dark:   '#231F20',
}

/* ── Category definitions ───────────────────────────────────────── */
const categories = [
  { id: 'rdp',            label: 'Mon quartier RDP',         emoji: '🏙️', color: BRAND.pink   },
  { id: 'mdj',            label: 'La MDJ-RDP',               emoji: '🏠', color: BRAND.yellow },
  { id: 'culture',        label: 'Culture québécoise',        emoji: '🎨', color: BRAND.orange },
  { id: 'sport',          label: 'Sport & Athlètes',          emoji: '🏀', color: BRAND.blue   },
  { id: 'entrepreneuriat',label: 'Entrepreneuriat',           emoji: '💼', color: BRAND.green  },
  { id: 'sante',          label: 'Santé & Bien-être',         emoji: '🧠', color: BRAND.pink   },
  { id: 'prevention',     label: 'Prévention & Droits',       emoji: '🛡️', color: BRAND.blue   },
  { id: 'enjeux',         label: 'Enjeux & Environnement',    emoji: '🌍', color: BRAND.green  },
] as const

type CategoryId = typeof categories[number]['id']

/* ── Questions bank ─────────────────────────────────────────────── */
interface Question {
  question: string
  options: string[]
  correct: number
  category: CategoryId
}

const ALL_QUESTIONS: Question[] = [
  /* ── RDP ── */
  {
    category: 'rdp',
    question: 'Dans quel arrondissement de Montréal se trouve Rivière-des-Prairies?',
    options: ['Mercier–Hochelaga-Maisonneuve', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Saint-Laurent', 'Montréal-Nord'],
    correct: 1,
  },
  {
    category: 'rdp',
    question: 'Quelle rivière longe le quartier de Rivière-des-Prairies au nord?',
    options: ['Le fleuve Saint-Laurent', 'La rivière des Prairies', 'La rivière Richelieu', 'La rivière des Outaouais'],
    correct: 1,
  },
  {
    category: 'rdp',
    question: 'Comment appelle-t-on familièrement les habitants de Rivière-des-Prairies?',
    options: ['Les Prairiens', 'Les Rivièrains', 'Les Prairiois', 'Les Rivièrois'],
    correct: 0,
  },
  {
    category: 'rdp',
    question: 'Quel est le surnom populaire de Rivière-des-Prairies?',
    options: ['RDP', 'La Prairie', 'Le Plateau', 'L\'Est'],
    correct: 0,
  },
  {
    category: 'rdp',
    question: 'Quel pont relie principalement RDP à Laval?',
    options: ['Pont Jacques-Cartier', 'Pont Pie-IX', 'Pont Louis-Bisson', 'Pont Viau'],
    correct: 3,
  },
  {
    category: 'rdp',
    question: 'RDP est situé dans quelle partie de l\'île de Montréal?',
    options: ['Ouest', 'Centre', 'Est', 'Nord-Est'],
    correct: 3,
  },
  /* ── MDJ ── */
  {
    category: 'mdj',
    question: 'Que signifie l\'acronyme "MDJ"?',
    options: ['Maison Des Jeunes', 'Mission Du Jeune', 'Mouvement Des Jeux', 'Maison Du Jeu'],
    correct: 0,
  },
  {
    category: 'mdj',
    question: 'La MDJ-RDP offre des services principalement pour quelle tranche d\'âge?',
    options: ['6 à 12 ans', '12 à 17 ans', '12 à 24 ans', '18 à 30 ans'],
    correct: 2,
  },
  {
    category: 'mdj',
    question: 'Quelle est la mission principale d\'une maison des jeunes?',
    options: ['Offrir des cours scolaires', 'Favoriser le développement des jeunes', 'Gérer un centre sportif', 'Offrir des soins médicaux'],
    correct: 1,
  },
  {
    category: 'mdj',
    question: 'La MDJ-RDP est un organisme de quel type?',
    options: ['Gouvernemental', 'Privé à but lucratif', 'Communautaire à but non lucratif', 'Scolaire'],
    correct: 2,
  },
  {
    category: 'mdj',
    question: 'Quel programme de la MDJ-RDP aide les jeunes à développer des projets d\'affaires?',
    options: ['CIEC', 'Sport-Études', 'Jeunes en action', 'Cap Jeunesse'],
    correct: 0,
  },
  {
    category: 'mdj',
    question: 'Que signifie CIEC dans le contexte MDJ?',
    options: ['Centre d\'Intégration et d\'Emploi Communautaire', 'Carrefour d\'Innovation et d\'Entrepreneuriat des Citoyens', 'Centre d\'Initiatives des Entrepreneurs et Communautés', 'Club d\'Investissement Entrepreneurial Communautaire'],
    correct: 1,
  },
  /* ── Culture québécoise ── */
  {
    category: 'culture',
    question: 'Quelle langue est principalement parlée à la MDJ-RDP?',
    options: ['Anglais', 'Espagnol', 'Français', 'Créole'],
    correct: 2,
  },
  {
    category: 'culture',
    question: 'Quelle fête nationale célébrée le 24 juin est propre au Québec?',
    options: ['La fête du Canada', 'La Saint-Jean-Baptiste', 'La fête de la Reine', 'La fête du Travail'],
    correct: 1,
  },
  {
    category: 'culture',
    question: 'Quel sport est l\'emblème de la culture québécoise?',
    options: ['Le soccer', 'Le basketball', 'Le hockey sur glace', 'Le baseball'],
    correct: 2,
  },
  {
    category: 'culture',
    question: 'Quel célèbre festival de musique a lieu chaque été à Montréal?',
    options: ['Osheaga', 'Le Festival de Jazz de Montréal', 'Lollapalooza', 'Coachella'],
    correct: 1,
  },
  {
    category: 'culture',
    question: 'Quel est le plat typique québécois fait de frites, fromage en grains et sauce?',
    options: ['La galvaude', 'Le pâté chinois', 'La poutine', 'Le cipâte'],
    correct: 2,
  },
  {
    category: 'culture',
    question: 'Comment s\'appelle le célèbre carnaval d\'hiver du Québec?',
    options: ['Le Carnaval de Montréal', 'Le Carnaval de Québec', 'La Fête des Neiges', 'L\'Igloofest'],
    correct: 1,
  },
  /* ── Sport ── */
  {
    category: 'sport',
    question: 'Quel sport est le plus populaire dans les rues de RDP?',
    options: ['Le soccer', 'Le basketball', 'Le hockey', 'Le baseball'],
    correct: 2,
  },
  {
    category: 'sport',
    question: 'Quelle équipe de hockey représente Montréal dans la LNH?',
    options: ['Les Sénateurs', 'Les Maple Leafs', 'Les Canadiens', 'Les Nordiques'],
    correct: 2,
  },
  {
    category: 'sport',
    question: 'Quel athlète québécois a remporté plusieurs titres mondiaux en haltérophilie?',
    options: ['Simon Dumont', 'Christine Girard', 'Bruny Surin', 'Mikaël Kingsbury'],
    correct: 1,
  },
  {
    category: 'sport',
    question: 'Quel Québécois est champion du monde de ski acrobatique (bosses)?',
    options: ['Jean-Luc Brassard', 'Mikaël Kingsbury', 'Erik Guay', 'Manuel Osborne-Paradis'],
    correct: 1,
  },
  {
    category: 'sport',
    question: 'Dans quel sport excelle Penny Oleksiak, originaire de Montréal?',
    options: ['Athlétisme', 'Natation', 'Cyclisme', 'Patinage artistique'],
    correct: 1,
  },
  {
    category: 'sport',
    question: 'Combien de buts Wayne Gretzky a-t-il marqués en carrière en LNH?',
    options: ['594', '700', '894', '1000'],
    correct: 2,
  },
  /* ── Entrepreneuriat ── */
  {
    category: 'entrepreneuriat',
    question: 'Qu\'est-ce qu\'un plan d\'affaires?',
    options: ['Un calendrier de vacances', 'Un document décrivant les objectifs et la stratégie d\'une entreprise', 'Un contrat de travail', 'Un bilan comptable'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Que signifie le terme "startup"?',
    options: ['Une grande entreprise établie', 'Une jeune entreprise innovante à fort potentiel de croissance', 'Un programme gouvernemental', 'Un type de franchise'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Qu\'est-ce que le financement participatif (crowdfunding)?',
    options: ['Un prêt bancaire', 'Un programme gouvernemental', 'Collecter des fonds auprès d\'un grand nombre de personnes via internet', 'Une subvention provinciale'],
    correct: 2,
  },
  {
    category: 'entrepreneuriat',
    question: 'Quel est l\'objectif du programme Défi OSEntreprendre?',
    options: ['Former des comptables', 'Reconnaître et soutenir les projets entrepreneuriaux', 'Financer uniquement les grandes entreprises', 'Offrir des stages en Europe'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Qu\'est-ce qu\'une coopérative?',
    options: ['Une entreprise détenue par un seul actionnaire', 'Une association détenue et gérée par ses membres', 'Un organisme gouvernemental', 'Une multinationale'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Le réseautage en affaires sert principalement à quoi?',
    options: ['Configurer des ordinateurs', 'Créer des connexions professionnelles et des opportunités', 'Gérer les finances', 'Recruter des employés uniquement'],
    correct: 1,
  },
  /* ── Santé & Bien-être ── */
  {
    category: 'sante',
    question: 'Combien d\'heures de sommeil sont recommandées pour un adolescent (14-17 ans)?',
    options: ['6 à 7 heures', '7 à 8 heures', '8 à 10 heures', '10 à 12 heures'],
    correct: 2,
  },
  {
    category: 'sante',
    question: 'Quelle pratique aide le plus à réduire le stress selon les experts?',
    options: ['Regarder les réseaux sociaux', 'L\'activité physique régulière', 'Dormir davantage seulement', 'Éviter tout effort'],
    correct: 1,
  },
  {
    category: 'sante',
    question: 'Combien de portions de fruits et légumes est-il recommandé de manger par jour?',
    options: ['2 portions', '4 portions', '7 à 10 portions', '12 portions'],
    correct: 2,
  },
  {
    category: 'sante',
    question: 'Qu\'est-ce que la santé mentale?',
    options: ['L\'absence de maladie physique', 'Le bien-être émotionnel, psychologique et social', 'Un résultat scolaire élevé', 'La capacité à faire du sport'],
    correct: 1,
  },
  {
    category: 'sante',
    question: 'Quel organisme québécois offre une ligne d\'écoute pour les jeunes en détresse?',
    options: ['Santé Canada', 'Tel-jeunes', 'CLSC', 'RAMQ'],
    correct: 1,
  },
  {
    category: 'sante',
    question: 'Quelle est la quantité d\'eau recommandée à boire par jour?',
    options: ['500 ml', '1 litre', '1,5 à 2 litres', '3 à 4 litres'],
    correct: 2,
  },
  /* ── Prévention & Droits ── */
  {
    category: 'prevention',
    question: 'À partir de quel âge peut-on voter aux élections fédérales au Canada?',
    options: ['16 ans', '17 ans', '18 ans', '21 ans'],
    correct: 2,
  },
  {
    category: 'prevention',
    question: 'Qu\'est-ce que le harcèlement scolaire (intimidation)?',
    options: ['Un jeu entre amis', 'Des comportements agressifs répétés envers une même personne', 'Une dispute ponctuelle', 'Une forme de taquinerie légère'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Quelle loi protège les droits des enfants au Canada?',
    options: ['La Charte canadienne des droits et libertés', 'La Convention des Nations Unies relative aux droits de l\'enfant', 'Le Code civil du Québec', 'La Loi sur l\'instruction publique'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Qu\'est-ce que le consentement éclairé?',
    options: ['Accepter quelque chose sous pression', 'Donner un accord libre, informé et révocable', 'Signer un contrat', 'Obéir à une figure d\'autorité'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Quel organisme peut aider un jeune victime de discrimination au Québec?',
    options: ['La Régie du logement', 'La Commission des droits de la personne et des droits de la jeunesse', 'Hydro-Québec', 'La SAQ'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Que faire si tu es témoin d\'un crime?',
    options: ['Ignorer la situation', 'Appeler le 911 ou le 310-4141', 'Publier une vidéo sur les réseaux sociaux', 'Régler ça soi-même'],
    correct: 1,
  },
  /* ── Enjeux & Environnement ── */
  {
    category: 'enjeux',
    question: 'Que signifie le terme "empreinte carbone"?',
    options: ['La couleur de la fumée des usines', 'La quantité de CO₂ émise par nos activités', 'Un type de combustible', 'L\'empreinte digitale d\'un moteur'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Quel geste quotidien réduit le plus notre impact environnemental?',
    options: ['Éteindre une lumière', 'Réduire la consommation de viande rouge', 'Recycler le papier', 'Utiliser des sacs réutilisables'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Qu\'est-ce que l\'économie circulaire?',
    options: ['Un système économique basé sur la croissance infinie', 'Un modèle qui vise à éliminer les déchets en réutilisant les ressources', 'Un type de marché boursier', 'Un programme de recyclage gouvernemental'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Quelle est la principale source d\'énergie du Québec?',
    options: ['Le pétrole', 'Le nucléaire', 'L\'hydroélectricité', 'Le gaz naturel'],
    correct: 2,
  },
  {
    category: 'enjeux',
    question: 'Que signifie "3RV" en environnement?',
    options: ['Recycler, Récupérer, Revendre', 'Réduire, Réutiliser, Recycler, Valoriser', 'Rénover, Réparer, Revitaliser', 'Réduire, Récupérer, Revendre'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Quel accord international vise à limiter le réchauffement climatique à 1,5°C?',
    options: ['L\'Accord de Kyoto', 'Le Protocole de Montréal', 'L\'Accord de Paris', 'La Convention de Rio'],
    correct: 2,
  },
]

const TIMER_DURATION = 20

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function loadPlayerName(): string {
  try { return localStorage.getItem('mdj_quiz_player_name') || '' } catch { return '' }
}
function savePlayerName(name: string) {
  try { localStorage.setItem('mdj_quiz_player_name', name) } catch { /* noop */ }
}

/* ── Shell wrapper ──────────────────────────────────────────────── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-start justify-center relative overflow-hidden" style={{ background: BRAND.dark }}>
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  )
}

type GameState = 'home' | 'playing' | 'result' | 'scores'

export default function QuizGame() {
  const [gameState, setGameState]         = useState<GameState>('home')
  const [scoresFrom, setScoresFrom]       = useState<'home' | 'result'>('home')
  const [selectedCat, setSelectedCat]     = useState<CategoryId | null>(null)
  const [shuffled, setShuffled]           = useState<Question[]>([])
  const [current, setCurrent]             = useState(0)
  const [score, setScore]                 = useState(0)
  const [timeLeft, setTimeLeft]           = useState(TIMER_DURATION)
  const [isAnswered, setIsAnswered]       = useState(false)
  const [selected, setSelected]           = useState<number | null>(null)
  const [playerName, setPlayerName]       = useState<string>(loadPlayerName)
  const [nameInput, setNameInput]         = useState<string>(loadPlayerName)
  const [localScores, setLocalScores]     = useState<{ name: string; score: number; cat: string }[]>(() => {
    try { return JSON.parse(localStorage.getItem('mdj_quiz_scores') || '[]') } catch { return [] }
  })

  /* ── Timer ── */
  useEffect(() => {
    if (gameState !== 'playing' || isAnswered) return
    if (timeLeft <= 0) { handleAnswer(-1); return }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [gameState, isAnswered, timeLeft])

  function startGame(catId: CategoryId) {
    const name = nameInput.trim() || 'Joueur'
    setPlayerName(name)
    savePlayerName(name)
    setSelectedCat(catId)
    const pool = ALL_QUESTIONS.filter(q => q.category === catId)
    const qs = shuffle(pool.length >= 6 ? pool : ALL_QUESTIONS).slice(0, 6)
    setShuffled(qs)
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
    if (current + 1 >= shuffled.length) { endGame(); return }
    setCurrent(c => c + 1)
    setTimeLeft(TIMER_DURATION)
    setIsAnswered(false)
    setSelected(null)
  }

  function endGame() {
    const finalScore = score
    const name = playerName || 'Joueur'
    const catLabel = categories.find(c => c.id === selectedCat)?.label ?? ''
    setLocalScores(prev => {
      const next = [...prev, { name, score: finalScore, cat: catLabel }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
      localStorage.setItem('mdj_quiz_scores', JSON.stringify(next))
      return next
    })
    setGameState('result')
  }

  function goToScores(from: 'home' | 'result') {
    setScoresFrom(from)
    setGameState('scores')
  }

  const q          = shuffled[current]
  const catDef     = categories.find(c => c.id === selectedCat)
  const catColor   = catDef?.color ?? BRAND.orange
  const timerPct   = (timeLeft / TIMER_DURATION) * 100
  const timerColor = timeLeft > 12 ? catColor : timeLeft > 6 ? BRAND.yellow : BRAND.pink
  const isReturning = playerName !== ''

  /* ══════════════════════════════
     HOME SCREEN
  ══════════════════════════════ */
  if (gameState === 'home') {
    return (
      <Shell>
        {/* Background blobs */}
        <div aria-hidden className="pointer-events-none absolute top-20 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: `${BRAND.yellow}18` }} />
        <div aria-hidden className="pointer-events-none absolute bottom-20 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: `${BRAND.pink}18` }} />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: `${BRAND.blue}10` }} />

        <div className="relative z-10 flex flex-col flex-1 px-5 py-10 text-white">
          {/* Logo + title */}
          <div className="flex flex-col items-center text-center mb-6">
            <img src="/mdj-logo-white.png" className="h-16 w-auto mx-auto mb-4" alt="MDJ-RDP" />
            <h1
              className="font-black text-4xl leading-tight"
              style={{
                background: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.pink}, ${BRAND.blue})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Quiz MDJ
            </h1>
            <p className="text-white/60 text-sm mt-1">Teste tes connaissances!</p>
          </div>

          {/* Name input */}
          <div className="mb-6">
            {isReturning && (
              <p className="text-white/60 text-sm mb-2 text-center">Bonjour {playerName}! 👋</p>
            )}
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder="Ton prénom…"
              maxLength={20}
              className="w-full min-h-[48px] rounded-2xl px-5 py-3 text-white font-semibold text-base placeholder-white/30 outline-none"
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.20)',
              }}
            />
            {isReturning && (
              <button
                onClick={() => { setPlayerName(''); setNameInput(''); savePlayerName('') }}
                className="mt-2 text-white/30 text-xs underline underline-offset-2 hover:text-white/60 transition-colors w-full text-center"
              >
                Pas toi? Change de prénom
              </button>
            )}
          </div>

          {/* Category grid */}
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 text-center">
            Choisis une catégorie
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => startGame(cat.id)}
                className="flex items-center gap-3 rounded-2xl px-4 py-4 min-h-[56px] text-left font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: `${cat.color}20`,
                  border: `1.5px solid ${cat.color}50`,
                }}
              >
                <span className="text-xl shrink-0">{cat.emoji}</span>
                <span className="text-sm leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Leaderboard link */}
          <button
            onClick={() => goToScores('home')}
            className="text-white/40 text-sm underline underline-offset-2 hover:text-white/60 transition-colors text-center"
          >
            Voir le classement
          </button>
        </div>
      </Shell>
    )
  }

  /* ══════════════════════════════
     PLAYING SCREEN
  ══════════════════════════════ */
  if (gameState === 'playing' && q) {
    return (
      <Shell>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-6 pb-4 shrink-0 text-white">
          <span className="text-white/50 text-sm font-semibold">{current + 1} / {shuffled.length}</span>
          <div className="flex items-center gap-1.5">
            {catDef && <span className="text-base">{catDef.emoji}</span>}
            <Clock size={15} style={{ color: timerColor }} />
            <span className="font-black text-lg tabular-nums" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
          <span className="font-bold" style={{ color: BRAND.yellow }}>★ {score}</span>
        </div>

        {/* Timer bar */}
        <div className="h-1.5 mx-4 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>

        {/* Question + answers */}
        <div className="flex-1 flex flex-col justify-between px-4 py-5 text-white">
          <div
            className="rounded-3xl p-6 mb-5"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: catColor }}>
              {catDef?.label ?? 'Question'} · {current + 1}/{shuffled.length}
            </p>
            <p className="font-bold text-lg leading-snug text-white">{q.question}</p>
          </div>

          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              let bg        = 'rgba(255,255,255,0.10)'
              let border    = 'rgba(255,255,255,0.10)'
              let textColor = '#ffffff'

              if (isAnswered) {
                if (i === q.correct) {
                  bg = `${BRAND.green}30`; border = BRAND.green; textColor = BRAND.green
                } else if (i === selected && i !== q.correct) {
                  bg = `${BRAND.pink}30`; border = BRAND.pink; textColor = BRAND.pink
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className="flex items-center gap-4 w-full min-h-[56px] rounded-2xl px-5 py-4 text-left font-semibold transition-all"
                  style={{ background: bg, border: `2px solid ${border}`, color: textColor }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm leading-snug">{opt}</span>
                  {isAnswered && i === q.correct && <CheckCircle size={20} className="shrink-0" style={{ color: BRAND.green }} />}
                  {isAnswered && i === selected && i !== q.correct && <XCircle size={20} className="shrink-0" style={{ color: BRAND.pink }} />}
                </button>
              )
            })}
          </div>

          {isAnswered && (
            <div className="mt-5">
              <p className="text-center text-sm font-semibold mb-3" style={{ color: selected === q.correct ? BRAND.green : BRAND.pink }}>
                {selected === q.correct
                  ? `Bravo! +${100 + Math.round((timeLeft / TIMER_DURATION) * 100)} pts`
                  : selected === -1 ? 'Temps écoulé!' : 'Mauvaise réponse!'}
              </p>
              <button
                onClick={nextQuestion}
                className="w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}
              >
                {current + 1 >= shuffled.length ? 'Voir mes résultats' : 'Question suivante →'}
              </button>
            </div>
          )}
        </div>
      </Shell>
    )
  }

  /* ══════════════════════════════
     RESULT SCREEN
  ══════════════════════════════ */
  if (gameState === 'result') {
    const maxScore  = shuffled.length * 200
    const pct       = Math.round((score / maxScore) * 100)
    const medal     = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉'
    const msg       = pct >= 80 ? 'Exceptionnel!' : pct >= 50 ? 'Bien joué!' : 'Continue à pratiquer!'
    const scoreColor = score >= 800 ? BRAND.yellow : score >= 500 ? BRAND.blue : BRAND.pink

    return (
      <Shell>
        <div className="flex flex-col items-center text-center flex-1 justify-center px-6 py-12 text-white">
          {/* Trophy circle */}
          <div
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-6"
            style={{ background: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.pink})` }}
          >
            {medal}
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold">Résultat final</p>
          <h2 className="font-black text-4xl text-white mb-2">{msg}</h2>
          {catDef && (
            <p className="text-sm font-semibold mb-6" style={{ color: catDef.color }}>
              {catDef.emoji} {catDef.label}
            </p>
          )}

          {/* Score bubble */}
          <div
            className="rounded-3xl px-10 py-6 mb-8 w-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.10)' }}
          >
            <p className="font-black text-6xl tabular-nums" style={{ color: scoreColor }}>{score}</p>
            <p className="text-white/40 text-sm mt-1">points sur {maxScore} max</p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => setGameState('home')}
              className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}
            >
              <RotateCcw size={18} />
              Rejouer
            </button>
            <button
              onClick={() => goToScores('result')}
              className="w-full min-h-[56px] rounded-2xl font-semibold transition-colors hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.70)',
              }}
            >
              Classement
            </button>
          </div>

          <button
            onClick={() => setGameState('home')}
            className="text-white/30 text-xs text-center mt-6 hover:text-white/60 underline underline-offset-2 transition-colors"
          >
            Changer de prénom?
          </button>
        </div>
      </Shell>
    )
  }

  /* ══════════════════════════════
     SCORES SCREEN
  ══════════════════════════════ */
  if (gameState === 'scores') {
    const rankColors = [BRAND.yellow, BRAND.blue, BRAND.orange, 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']

    return (
      <Shell>
        <div className="flex flex-col flex-1 px-5 py-10 text-white">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setGameState(scoresFrom)}
              className="flex items-center gap-1 text-sm transition-colors hover:text-white/60"
              style={{ color: 'rgba(255,255,255,0.40)' }}
            >
              <ArrowLeft size={16} />
              Retour
            </button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.pink})` }}
            >
              <Trophy size={20} className="text-white" />
            </div>
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold text-center">MDJ ARCADE</p>
          <h2 className="font-black text-3xl text-white mb-8 text-center">Classement</h2>

          <div className="flex flex-col gap-3 flex-1">
            {localScores.length === 0 ? (
              <p className="text-white/40 text-center mt-10">
                Aucun joueur enregistré. Joue pour apparaître ici!
              </p>
            ) : (
              localScores.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 min-h-[56px]"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="font-black text-xl w-8 shrink-0" style={{ color: rankColors[i] ?? rankColors[4] }}>
                    {i + 1}
                  </span>
                  <span className="font-semibold text-white flex-1 text-left">{entry.name}</span>
                  {entry.cat && <span className="text-white/30 text-xs mr-2 hidden sm:block">{entry.cat}</span>}
                  <span className="font-bold text-sm tabular-nums" style={{ color: BRAND.yellow }}>
                    {entry.score} pts
                  </span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setGameState('home')}
            className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90 mt-8"
            style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}
          >
            Jouer
          </button>
        </div>
      </Shell>
    )
  }

  return null
}
