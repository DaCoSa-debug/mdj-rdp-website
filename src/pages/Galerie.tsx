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
  src?: string
  alt?: string
  imageWidth?: number
  imageHeight?: number
}

const photos: Photo[] = [
  { gradient: 'from-orange-200 to-yellow-200',  emoji: '🏀', label: 'Basketball',     category: 'Sport', src: '/images/activites/mdj-rdp-jeunes-activite-sport.webp', alt: 'Partie de basketball entre jeunes à la Maison des jeunes de Rivière-des-Prairies à Montréal', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-pink-200 to-red-200',        emoji: '🎨', label: 'Atelier art',    category: 'Arts', src: '/images/activites/mdj-rdp-jeunes-atelier-creatif.webp', alt: "Jeunes lors d'un atelier artistique à la Maison des jeunes de Rivière-des-Prairies à Montréal", imageWidth: 1200, imageHeight: 896 },
  { gradient: 'from-blue-200 to-cyan-200',       emoji: '⚽', label: 'Soccer',         category: 'Sport', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-purple-200 to-pink-200',     emoji: '🎵', label: 'Concert MDJ',    category: 'Événements', src: '/images/activites/mdj-rdp-jeunes-evenement-musical.webp', alt: 'Événement musical et communautaire à la Maison des jeunes de Rivière-des-Prairies à Montréal', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-green-200 to-emerald-200',   emoji: '🌿', label: 'Plein air',      category: 'Sorties', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-yellow-200 to-orange-200',   emoji: '🍳', label: 'Cuisine',        category: 'Arts', src: '/images/activites/mdj-rdp-jeunes-activite-cuisine.webp', alt: 'Atelier cuisine du monde à la Maison des jeunes de Rivière-des-Prairies à Montréal', imageWidth: 1264, imageHeight: 848 },
  { gradient: 'from-indigo-200 to-purple-200',   emoji: '🎭', label: 'Théâtre',        category: 'Arts', src: '/images/galerie/mdj-rdp-jeunes-atelier-theatre.webp', alt: "Jeunes participant à un atelier de théâtre et d'improvisation à la Maison des jeunes de Rivière-des-Prairies à Montréal", imageWidth: 1200, imageHeight: 896 },
  { gradient: 'from-teal-200 to-blue-200',       emoji: '🏐', label: 'Volleyball',     category: 'Sport', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-rose-200 to-pink-200',       emoji: '🎊', label: 'Gala CIEC',      category: 'CIEC', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-amber-200 to-yellow-200',    emoji: '🚌', label: 'Sortie autobus', category: 'Sorties', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-cyan-200 to-sky-200',        emoji: '🏆', label: 'Tournoi',        category: 'Événements', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-lime-200 to-green-200',      emoji: '🌳', label: 'Randonnée',      category: 'Sorties', imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-violet-200 to-indigo-200',   emoji: '🎬', label: 'Cinéma',         category: 'Sorties', src: '/images/galerie/mdj-rdp-jeunes-soiree-cinema.webp', alt: "Jeunes regardant un film projeté ensemble lors d'une soirée cinéma à la Maison des jeunes de Rivière-des-Prairies à Montréal", imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-orange-200 to-red-200',      emoji: '🏆', label: 'Compétition',    category: 'Événements', src: '/images/galerie/mdj-rdp-jeunes-competition-defi.webp', alt: 'Jeunes participant à une compétition de construction avec des blocs de bois à la Maison des jeunes de Rivière-des-Prairies à Montréal', imageWidth: 1200, imageHeight: 896 },
  { gradient: 'from-blue-200 to-indigo-200',     emoji: '💡', label: 'Atelier CIEC',   category: 'CIEC', src: '/images/galerie/mdj-rdp-jeunes-atelier-ciec-entrepreneuriat.webp', alt: "Jeunes participants à un atelier d'entrepreneuriat CIEC à la Maison des jeunes de Rivière-des-Prairies à Montréal", imageWidth: 1200, imageHeight: 896 },
  { gradient: 'from-pink-200 to-orange-200',     emoji: '🎊', label: 'Fête fin année', category: 'Événements', src: '/images/galerie/mdj-rdp-jeunes-fete-fin-annee.webp', alt: "Jeunes à la fête de fin d'année de la Maison des jeunes de Rivière-des-Prairies à Montréal", imageWidth: 1376, imageHeight: 768 },
  { gradient: 'from-teal-200 to-emerald-200',    emoji: '🧩', label: 'Vie communautaire', category: 'Événements', src: '/images/galerie/mdj-rdp-jeunes-vie-communautaire.webp', alt: "Jeunes jouant au Jenga, dessinant et discutant ensemble dans un espace communautaire à la Maison des jeunes de Rivière-des-Prairies à Montréal", imageWidth: 2400, imageHeight: 1792 },
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
              {visible.map(({ gradient, emoji, label, src, alt, imageWidth, imageHeight }, i) => (
                <div
                  key={label + i}
                  className={`relative group aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} cursor-pointer`}
                >
                  {/* Card content */}
                  {src ? (
                    <img
                      src={src}
                      alt={alt || label}
                      width={imageWidth ?? 1376}
                      height={imageHeight ?? 768}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-xs text-gray-600 font-medium mt-2">{label}</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye size={32} strokeWidth={2} className="text-white" />
                  </div>
                  {/* Label for image cards */}
                  {src && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs font-semibold leading-snug">{label}</p>
                    </div>
                  )}
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
