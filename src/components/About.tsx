import { Heart, Sparkles, Users, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

interface Card {
  icon: LucideIcon
  color: string
  title: string
  text: string
}

const cards: Card[] = [
  {
    icon: Heart,
    color: PINK,
    title: 'Écoute',
    text: "Des intervenants formés et disponibles pour t'accompagner.",
  },
  {
    icon: Sparkles,
    color: ORANGE,
    title: 'Gratuité',
    text: 'Tous nos services sont entièrement gratuits pour les jeunes.',
  },
  {
    icon: Users,
    color: BLUE,
    title: 'Inclusion',
    text: 'Un lieu ouvert à tous, peu importe ton origine ou ton parcours.',
  },
  {
    icon: Rocket,
    color: PINK,
    title: 'Confiance',
    text: 'Un espace sécuritaire où tu peux être toi-même.',
  },
]

export default function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
            Nos valeurs
          </p>
          <h2 className="mt-2 font-black text-3xl md:text-5xl text-gray-900">
            Pourquoi choisir la MDJ-RDP?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Un espace pensé pour toi, par des gens qui te ressemblent.
          </p>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, color, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              {/* Icon wrapper */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${color}1A` }}
              >
                <Icon size={22} strokeWidth={2} style={{ color }} />
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
