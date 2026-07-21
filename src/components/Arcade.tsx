import { Link } from 'react-router-dom'
import { Gamepad2, Trophy, Sparkles } from 'lucide-react'

const ORANGE = '#FBB040'
const PINK   = '#F05063'
const BLUE   = '#00AEEF'

const gradientBorder = 'linear-gradient(135deg, #FBB040, #F05063, #00AEEF)'

const games = [
  { Icon: Gamepad2, color: ORANGE, title: 'Pac-MDJ',    tag: 'Arcade classique' },
  { Icon: Trophy,   color: PINK,   title: 'Basket MDJ', tag: 'Sport virtuel' },
  { Icon: Sparkles, color: BLUE,   title: 'Quiz RDP',   tag: 'Culture & Savoir' },
]

export default function Arcade() {
  return (
    <section className="py-20" style={{ background: '#1a1a1a' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">

          {/* LEFT — text */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wide text-white/40">
              MDJ ARCADE
            </p>
            <h2 className="font-black text-4xl md:text-5xl leading-tight mt-2 text-white">
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
            </h2>
            <p className="text-white/60 mt-4 text-lg max-w-sm">
              L'espace gaming de la MDJ-RDP. Des jeux pour créer des liens et avoir du fun.
            </p>
            <Link
              to="/arcade"
              className="mt-8 inline-flex items-center rounded-full px-8 py-4 font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
            >
              Entrer dans l'arcade →
            </Link>
          </div>

          {/* RIGHT — game cards */}
          <div className="flex flex-col gap-4">
            {games.map(({ Icon, color, title, tag }) => (
              <div
                key={title}
                className="p-[2px] rounded-2xl"
                style={{ background: gradientBorder }}
              >
                <div className="bg-[#2a2a2a] rounded-[calc(1rem-2px)] p-5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }}>
                    <Icon size={28} strokeWidth={1.5} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
