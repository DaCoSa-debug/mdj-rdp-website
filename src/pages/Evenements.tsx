import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK = '#F05063'

interface Event {
  day: string
  month: string
  category: string
  categoryStyle: string
  title: string
  sub: string
}

const events: Event[] = [
  { day: '11', month: 'NOV', category: 'SPORT',   categoryStyle: 'bg-orange-100 text-orange-600', title: 'Tournoi de basketball inter-MDJ',    sub: 'Gym MDJ · 14h–17h' },
  { day: '13', month: 'NOV', category: 'CULTURE', categoryStyle: 'bg-blue-100 text-blue-600',     title: 'Atelier graffiti & art urbain',       sub: 'Salle créative · 13h–16h' },
  { day: '15', month: 'NOV', category: 'CULTURE', categoryStyle: 'bg-blue-100 text-blue-600',     title: 'Soirée cinéma en plein air',          sub: 'Cour MDJ · 19h–22h' },
  { day: '18', month: 'NOV', category: 'ATELIER', categoryStyle: 'bg-green-100 text-green-600',   title: 'Cuisine du monde — Mexique',          sub: 'Cuisine MDJ · 15h–18h' },
  { day: '20', month: 'NOV', category: 'ATELIER', categoryStyle: 'bg-green-100 text-green-600',   title: 'Atelier cuisine du monde',            sub: 'Cuisine MDJ · 15h–18h' },
  { day: '22', month: 'NOV', category: 'CIEC',    categoryStyle: 'bg-pink-100 text-pink-600',     title: 'Session CIEC — Module 3',             sub: 'Salle de conf. · 09h–12h' },
  { day: '28', month: 'NOV', category: 'SORTIE',  categoryStyle: 'bg-gray-100 text-gray-600',     title: 'Sortie patinoire Île-Ste-Hélène',     sub: 'Départ MDJ · 13h–17h' },
  { day: '02', month: 'DÉC', category: 'CIEC',    categoryStyle: 'bg-pink-100 text-pink-600',     title: 'Lancement officiel du CIEC 2026',     sub: 'Salle principale · 10h–12h' },
]

const filters = ['Tous', 'SPORT', 'CULTURE', 'ATELIER', 'CIEC', 'SORTIE']

export default function Evenements() {
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous'
    ? events
    : events.filter((e) => e.category === activeFilter)

  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 text-center"
          style={{ background: `linear-gradient(135deg, rgba(0,174,239,0.08), rgba(240,80,99,0.08))` }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              AGENDA
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              Ce mois-ci à la MDJ.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
              Découvre tous les événements, ateliers et activités à venir. Inscris-toi directement en ligne.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — FILTER BAR ── */}
        <div className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    activeFilter === f
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={activeFilter === f ? { background: PINK } : undefined}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 3 — EVENTS LIST ── */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="font-black text-2xl text-gray-900 mb-6">Novembre 2025</h2>

            {filtered.length === 0 ? (
              <p className="text-gray-400 text-center py-12">Aucun événement pour cette catégorie.</p>
            ) : (
              <div>
                {filtered.map((event, i) => (
                  <div
                    key={event.title + event.day}
                    className={`flex items-center gap-6 py-5 ${i < filtered.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    {/* Date box */}
                    <div className="min-w-[56px] text-center shrink-0">
                      <div className="font-black text-2xl text-gray-900 leading-none">{event.day}</div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-0.5">{event.month}</div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${event.categoryStyle}`}>
                        {event.category}
                      </span>
                      <p className="font-semibold text-gray-900 mt-1">{event.title}</p>
                      <p className="text-gray-400 text-sm mt-1">{event.sub}</p>
                    </div>

                    {/* Register */}
                    <a
                      href="#"
                      className="ml-auto shrink-0 text-sm font-semibold whitespace-nowrap hover:opacity-70 transition-opacity"
                      style={{ color: PINK }}
                    >
                      S'inscrire →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
