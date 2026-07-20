import { Sparkles, ArrowRight, Calendar } from 'lucide-react'

const PINK  = '#F05063'
const ORANGE = '#FBB040'
const BLUE  = '#00AEEF'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">

      {/* Background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
        style={{ background: `${PINK}33` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
        style={{ background: `${BLUE}33` }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN — text ── */}
          <div className="relative">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6"
              style={{ background: `${PINK}1A`, color: PINK }}
            >
              <Sparkles size={16} strokeWidth={2.5} />
              Depuis 1982, pour les jeunes de RDP
            </div>

            {/* H1 */}
            <h1 className="font-black text-4xl md:text-6xl leading-tight text-gray-900">
              Un espace pour<br />
              grandir, créer<br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${BLUE})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                et s'épanouir
              </span>
            </h1>

            {/* Paragraph */}
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              La Maison des jeunes de Rivière-des-Prairies offre un lieu sûr,
              gratuit et bienveillant pour les jeunes de 12 à 17 ans.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)` }}
              >
                Découvrir les activités
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-full border-2 bg-transparent px-8 py-4 font-semibold transition-colors hover:bg-pink-50"
                style={{ borderColor: PINK, color: PINK }}
              >
                <Calendar size={18} strokeWidth={2.5} />
                Prochains événements
              </a>
            </div>

            {/* Floating stat card */}
            <div
              className="animate-float-slow absolute -bottom-6 lg:bottom-10 right-0 lg:-right-8 bg-white rounded-2xl px-6 py-4 flex items-center gap-3 z-10"
              style={{ boxShadow: '0 10px 30px -12px rgba(0,0,0,0.15)' }}
            >
              <div className="font-black text-2xl" style={{ color: PINK }}>500+</div>
              <div className="text-sm text-gray-600 leading-snug">
                jeunes accompagnés<br />par année
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — image placeholder ── */}
          <div className="relative mt-12 lg:mt-0">
            <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
              <span className="text-gray-400 text-lg select-none">📸 hero-youth.jpg</span>

              {/* Pink+blue overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[2rem]"
                style={{
                  background: `linear-gradient(to bottom, rgba(240,80,99,0.15), rgba(0,174,239,0.15))`,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
