import { Link } from 'react-router-dom'
import { Gamepad2, Trophy, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

const gradientBorder = 'linear-gradient(135deg, #FBB040, #F05063, #00AEEF)'

const games = [
  {
    Icon:  Gamepad2,
    color: ORANGE,
    title: 'Pac-MDJ',
    tag:   'Arcade classique',
    text:  'Une version MDJ du classique Pac-Man. Évite les obstacles et collecte des points!',
  },
  {
    Icon:  Trophy,
    color: PINK,
    title: 'Basket MDJ',
    tag:   'Sport virtuel',
    text:  'Montre tes skills au basketball virtuel. Défie tes amis et grimpe dans le classement!',
  },
  {
    Icon:  Sparkles,
    color: BLUE,
    title: 'Quiz RDP',
    tag:   'Culture & Savoir',
    text:  'Teste tes connaissances sur Rivière-des-Prairies, la MDJ et la culture québécoise!',
  },
]

const leaderboard = [
  { rank: 1, name: 'MJ_Pro_22',  score: '9 840 pts' },
  { rank: 2, name: 'BasketKing', score: '8 210 pts' },
  { rank: 3, name: 'QuizMaster', score: '7 650 pts' },
  { rank: 4, name: 'RDP_Legend', score: '6 920 pts' },
  { rank: 5, name: 'ArcadeGirl', score: '5 430 pts' },
]

const rankColor = (rank: number) => {
  if (rank === 1) return ORANGE
  if (rank === 2) return 'rgba(255,255,255,0.60)'
  if (rank === 3) return 'rgba(255,255,255,0.40)'
  return 'rgba(255,255,255,0.20)'
}

export default function Arcade() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-24 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)' }}
        >
          {/* Decorative blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-[#FBB040]/20" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl bg-[#F05063]/20" />
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-[#00AEEF]/10" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-4">
              MDJ ARCADE
            </p>
            <h1 className="font-black text-5xl md:text-7xl leading-tight">
              Joue.<br />
              Apprends.<br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${BLUE})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Partage.
              </span>
            </h1>
            <p className="text-white/70 mt-6 text-lg max-w-xl mx-auto">
              L'espace gaming de la MDJ-RDP — un lieu où les jeux deviennent un prétexte pour créer des liens, développer des compétences et avoir du fun.
            </p>
            <a
              href="#jeux"
              className="mt-10 inline-flex items-center rounded-full px-10 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
            >
              Entrer dans l'arcade ↓
            </a>
          </div>
        </section>

        {/* ── SECTION 2 — GAMES GRID ── */}
        <section id="jeux" className="py-20" style={{ background: '#1a1a1a' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-semibold text-sm uppercase tracking-wide text-white/40">
              NOS JEUX
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-white text-center mb-12">
              Choisis ton jeu.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {games.map(({ Icon, color, title, tag, text }) => (
                <div
                  key={title}
                  className="p-[2px] rounded-3xl"
                  style={{ background: gradientBorder }}
                >
                  <div className="bg-[#2a2a2a] rounded-[calc(1.5rem-2px)] p-8 h-full">
                    <Icon size={48} strokeWidth={1.5} style={{ color }} className="mb-4" />
                    <h3 className="font-black text-2xl text-white">{title}</h3>
                    <p className="text-xs text-white/40 uppercase tracking-wide mt-1">{tag}</p>
                    <p className="text-white/60 text-sm mt-4 leading-relaxed">{text}</p>
                    <button
                      type="button"
                      className="mt-6 w-full rounded-full py-3 font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
                    >
                      Jouer maintenant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — LEADERBOARD ── */}
        <section className="py-20" style={{ background: '#111111' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-semibold text-sm uppercase tracking-wide text-white/40">
              CLASSEMENT
            </p>
            <h2 className="mt-2 font-black text-3xl text-white text-center mb-12">
              Les meilleurs joueurs.
            </h2>

            <div className="max-w-lg mx-auto flex flex-col gap-3">
              {leaderboard.map(({ rank, name, score }) => (
                <div
                  key={rank}
                  className="flex items-center gap-4 rounded-2xl px-6 py-4"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <span className="font-black text-2xl w-8 shrink-0" style={{ color: rankColor(rank) }}>
                    {rank}
                  </span>
                  <span className="font-semibold text-white flex-1">{name}</span>
                  <span className="font-bold text-white/60 text-sm">{score}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — CTA ── */}
        <section
          className="py-20 text-center text-white"
          style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${BLUE})` }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-black text-4xl">Viens jouer à la MDJ!</h2>
            <p className="text-white/80 mt-4">
              L'arcade est ouverte à tous les membres. Viens en personne pour accéder à tous nos jeux et tournois!
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 font-bold transition-opacity hover:opacity-90"
              style={{ color: PINK }}
            >
              Devenir membre
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
