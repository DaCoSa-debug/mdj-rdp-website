import { useState } from 'react'
import { Heart } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'

const amounts = [
  { value: '20 $',  label: 'Un atelier pour un jeune' },
  { value: '50 $',  label: "Une semaine d'activités" },
  { value: '100 $', label: 'Un mois de programme complet' },
  { value: '200 $', label: 'Une session CIEC complète' },
]

const statCards = [
  {
    stat:  '500+',
    label: 'jeunes accompagnés par année',
    sub:   'dans tous nos programmes gratuits',
  },
  {
    stat:  '100%',
    label: 'des services sont gratuits',
    sub:   'pour tous les jeunes de 12-17 ans',
  },
  {
    stat:  '40+',
    label: "années d'expérience",
    sub:   'au service de la communauté RDP',
  },
]

export default function Donation() {
  const [selected, setSelected] = useState('50 $')

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT — donation card */}
          <div
            className="rounded-[2rem] p-10 text-white"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
          >
            {/* Label */}
            <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wide" style={{ color: PINK }}>
              <Heart size={16} strokeWidth={2.5} color={PINK} />
              <span className="text-white/80">FAIRE UN DON</span>
            </div>

            {/* Heading */}
            <h2 className="mt-2 font-black text-4xl md:text-5xl text-white">
              Ton don change une vie de jeune.
            </h2>

            {/* Body */}
            <p className="mt-4 text-white/80">
              Chaque dollar versé à la MDJ-RDP permet à un jeune de participer à nos programmes, d'explorer ses passions et de vivre des projets qui le construisent.
            </p>

            {/* Amount options */}
            <div className="flex flex-col gap-3 mt-8">
              {amounts.map(({ value, label }) => {
                const isSelected = selected === value
                return (
                  <div
                    key={value}
                    onClick={() => setSelected(value)}
                    className="flex items-center gap-4 rounded-2xl p-4 border cursor-pointer transition-colors"
                    style={{
                      background: isSelected ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)',
                      borderColor: isSelected ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.20)',
                    }}
                  >
                    {/* Radio circle */}
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0"
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-white text-lg">{value}</span>
                      <span className="text-white/70 text-sm ml-3">{label}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-8 w-full rounded-full py-4 text-lg font-bold transition-colors hover:bg-gray-50"
              style={{ background: '#fff', color: PINK }}
            >
              Faire un don maintenant
            </button>
          </div>

          {/* RIGHT — impact stat cards */}
          <div className="flex flex-col gap-4">
            {statCards.map(({ stat, label, sub }) => (
              <div
                key={stat + label}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="font-black text-3xl text-gray-900">{stat}</div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
                <div className="text-gray-400 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
