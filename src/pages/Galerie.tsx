import { useState } from 'react'
import { Eye } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK = '#F05063'

type Category = 'Tout' | 'Sport' | 'Arts' | 'CIEC' | 'Sorties' | 'Événements'

interface Photo {
  gradient: string
  emoji: string
  label: string
  category: Exclude<Category, 'Tout'>
}

const photos: Photo[] = [
  { gradient: 'from-orange-200 to-yellow-200',  emoji: '🏀', label: 'Basketball',     category: 'Sport' },
  { gradient: 'from-pink-200 to-red-200',        emoji: '🎨', label: 'Atelier art',    category: 'Arts' },
  { gradient: 'from-blue-200 to-cyan-200',       emoji: '⚽', label: 'Soccer',         category: 'Sport' },
  { gradient: 'from-purple-200 to-pink-200',     emoji: '🎵', label: 'Concert MDJ',    category: 'Événements' },
  { gradient: 'from-green-200 to-emerald-200',   emoji: '🌿', label: 'Plein air',      category: 'Sorties' },
  { gradient: 'from-yellow-200 to-orange-200',   emoji: '🍳', label: 'Cuisine',        category: 'Arts' },
  { gradient: 'from-indigo-200 to-purple-200',   emoji: '🎭', label: 'Théâtre',        category: 'Arts' },
  { gradient: 'from-teal-200 to-blue-200',       emoji: '🏐', label: 'Volleyball',     category: 'Sport' },
  { gradient: 'from-rose-200 to-pink-200',       emoji: '🎊', label: 'Gala CIEC',      category: 'CIEC' },
  { gradient: 'from-amber-200 to-yellow-200',    emoji: '🚌', label: 'Sortie autobus', category: 'Sorties' },
  { gradient: 'from-cyan-200 to-sky-200',        emoji: '🏆', label: 'Tournoi',        category: 'Événements' },
  { gradient: 'from-lime-200 to-green-200',      emoji: '🌳', label: 'Randonnée',      category: 'Sorties' },
  { gradient: 'from-violet-200 to-indigo-200',   emoji: '🎬', label: 'Cinéma',         category: 'Sorties' },
  { gradient: 'from-orange-200 to-red-200',      emoji: '🏆', label: 'Compétition',    category: 'Événements' },
  { gradient: 'from-blue-200 to-indigo-200',     emoji: '💡', label: 'Atelier CIEC',   category: 'CIEC' },
  { gradient: 'from-pink-200 to-orange-200',     emoji: '🎊', label: 'Fête fin année', category: 'Événements' },
]

const filters: Category[] = ['Tout', 'Sport', 'Arts', 'CIEC', 'Sorties', 'Événements']

export default function Galerie() {
  const [activeFilter, setActiveFilter] = useState<Category>('Tout')

  const visible = activeFilter === 'Tout'
    ? photos
    : photos.filter((p) => p.category === activeFilter)

  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(251,176,64,0.08), rgba(240,80,99,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              GALERIE
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              Des moments qui restent.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
              Revois les meilleurs moments de la MDJ-RDP — activités, événements, sorties et bien plus.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — FILTER + GRID ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Filter pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
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

            {/* Photo grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map(({ gradient, emoji, label }, i) => (
                <div
                  key={label + i}
                  className={`relative group aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} cursor-pointer`}
                >
                  {/* Card content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-xs text-gray-600 font-medium mt-2">{label}</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye size={32} strokeWidth={2} className="text-white" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
