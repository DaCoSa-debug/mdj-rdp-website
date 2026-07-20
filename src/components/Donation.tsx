import { useState } from 'react'
import { Heart, Users, Sparkles, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

const amounts = ['25 $', '50 $', '100 $', 'Autre']

interface StatCard {
  icon: LucideIcon
  color: string
  stat: string
  label: string
  sub: string
}

const statCards: StatCard[] = [
  {
    icon:  Users,
    color: PINK,
    stat:  '500+',
    label: 'jeunes accompagnés par année',
    sub:   'dans tous nos programmes',
  },
  {
    icon:  Sparkles,
    color: ORANGE,
    stat:  '100%',
    label: 'des services sont gratuits',
    sub:   'pour tous les jeunes de 12-17 ans',
  },
  {
    icon:  Rocket,
    color: BLUE,
    stat:  '40+',
    label: "années d'expérience",
    sub:   'au service de la communauté RDP',
  },
]

export default function Donation() {
  const [selected, setSelected] = useState('50 $')

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT — pink donation card */}
          <div
            className="rounded-[2rem] p-10 text-white"
            style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)` }}
          >
            {/* Label */}
            <div className="flex items-center gap-2 text-white/80 font-semibold text-sm uppercase tracking-wide">
              <Heart size={16} strokeWidth={2.5} />
              Faire un don
            </div>

            {/* Heading */}
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-white">
              Soutiens les jeunes de RDP
            </h2>

            {/* Body */}
            <p className="mt-4 text-white/80 leading-relaxed">
              Ton don aide directement les jeunes de Rivière-des-Prairies à accéder
              à des programmes gratuits.
            </p>

            {/* Amount buttons */}
            <div className="grid grid-cols-4 gap-3 mt-8">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelected(amount)}
                  className="rounded-full py-3 text-sm font-bold transition-all"
                  style={
                    selected === amount
                      ? { background: '#fff', color: PINK, border: 'none' }
                      : { background: 'rgba(255,255,255,0.20)', color: '#fff', border: '1px solid rgba(255,255,255,0.30)' }
                  }
                >
                  {amount}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-6 w-full rounded-full py-4 text-lg font-bold transition-colors hover:bg-gray-50"
              style={{ background: '#fff', color: PINK }}
            >
              Faire un don maintenant
            </button>
          </div>

          {/* RIGHT — stat cards */}
          <div className="flex flex-col gap-4">
            {statCards.map(({ icon: Icon, color, stat, label, sub }) => (
              <div
                key={stat + label}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}1A` }}
                >
                  <Icon size={20} strokeWidth={2} style={{ color }} />
                </div>
                <div>
                  <div className="font-black text-4xl text-gray-900 leading-none">{stat}</div>
                  <div className="font-semibold text-gray-700 mt-1">{label}</div>
                  <div className="text-sm text-gray-400 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
