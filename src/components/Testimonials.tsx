import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

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
    quote:    "La MDJ-RDP a changé ma vie. J'ai trouvé ma passion pour l'entrepreneuriat grâce à la CIEC.",
    name:     'Aminata S.',
    role:     'Participante CIEC 2024',
    initials: 'AS',
  },
  {
    quote:    'Un endroit où je me sens vraiment chez moi. Les intervenants sont toujours là pour nous.',
    name:     'Malik T.',
    role:     'Membre depuis 2022',
    initials: 'MT',
  },
  {
    quote:    "Grâce aux activités sportives, j'ai développé ma confiance en moi et mes amis pour la vie.",
    name:     'Sofia R.',
    role:     'Équipe basketball MDJ',
    initials: 'SR',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length
  const t = testimonials[current]

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
            Témoignages
          </p>
          <h2 className="mt-2 font-black text-3xl md:text-5xl text-gray-900">
            Ce qu'ils disent de nous
          </h2>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — quote card */}
          <div
            className="bg-white rounded-[2rem] p-10"
            style={{ boxShadow: '0 10px 30px -12px rgba(0,0,0,0.15)' }}
          >
            {/* Quote icon */}
            <Quote
              size={40}
              strokeWidth={1.5}
              className="mb-6"
              style={{ color: PINK }}
            />

            {/* Quote text */}
            <blockquote className="font-medium text-xl text-gray-800 leading-relaxed italic">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)` }}
              >
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
          </div>

          {/* RIGHT — counter + controls */}
          <div>
            {/* Counter */}
            <div className="font-black text-5xl text-gray-200 mb-8 select-none">
              {pad(current + 1)}{' '}
              <span className="text-gray-300">/</span>{' '}
              {pad(total)}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Précédent"
                onClick={prev}
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors hover:border-current hover:text-current"
                style={
                  current > 0
                    ? { borderColor: PINK, color: PINK }
                    : { borderColor: '#E5E7EB', color: '#9CA3AF' }
                }
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Suivant"
                onClick={next}
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors"
                style={
                  current < total - 1
                    ? { borderColor: PINK, color: PINK }
                    : { borderColor: '#E5E7EB', color: '#9CA3AF' }
                }
              >
                <ChevronRight size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === current ? '2rem' : '0.5rem',
                    background: i === current ? PINK : '#E5E7EB',
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
