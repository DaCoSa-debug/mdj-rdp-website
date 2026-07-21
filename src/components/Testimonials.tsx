import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:    "À la MDJ j'ai trouvé une famille. J'ose enfin faire de la musique en public et je me sens écoutée.",
    name:     'Sarah',
    role:     'Membre au Club',
    initials: 'S',
  },
  {
    quote:    "La CIEC m'a appris à croire en mes idées. J'ai lancé mon premier projet à 15 ans.",
    name:     'Karim B.',
    role:     'Ancien participant CIEC',
    initials: 'KB',
  },
  {
    quote:    "Ici tout le monde est le bienvenu. J'ai trouvé des amis et une passion pour le basketball.",
    name:     'Léa M.',
    role:     'Équipe basketball MDJ',
    initials: 'LM',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length
  const t = testimonials[current]

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
          ILS TÉMOIGNENT
        </p>
        <h2 className="mt-2 font-black text-4xl md:text-5xl text-gray-900">
          Des jeunes qui s'épanouissent.
        </h2>

        {/* 2-col layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — counter + dot indicators + prev/next */}
          <div>
            {/* Large counter */}
            <div className="font-black text-8xl text-gray-100 leading-none select-none">
              {current + 1}
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '2rem' : '0.5rem',
                    background: i === current ? PINK : '#E5E7EB',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                aria-label="Précédent"
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors"
                style={
                  current > 0
                    ? { borderColor: PINK, color: PINK }
                    : { borderColor: '#E5E7EB', color: '#D1D5DB' }
                }
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Suivant"
                onClick={next}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors"
                style={
                  current < total - 1
                    ? { borderColor: PINK, color: PINK }
                    : { borderColor: '#E5E7EB', color: '#D1D5DB' }
                }
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* RIGHT — quote card */}
          <div
            className="bg-white rounded-[2rem] p-10"
            style={{ boxShadow: '0 10px 30px -12px rgba(0,0,0,0.12)' }}
          >
            {/* Large quote mark */}
            <div className="font-black text-6xl leading-none mb-4" style={{ color: PINK }}>
              "
            </div>

            {/* Quote text */}
            <p className="font-medium text-xl text-gray-800 leading-relaxed">
              {t.quote}
            </p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
              >
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
