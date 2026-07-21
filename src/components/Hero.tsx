import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Calendar, Trophy } from 'lucide-react'

const PINK  = '#F05063'
const ORANGE = '#FBB040'
const BLUE  = '#00AEEF'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">

      {/* Background blob — right side shaped panel (behind all content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: `linear-gradient(135deg, rgba(251,176,64,0.15), rgba(240,80,99,0.15), rgba(0,174,239,0.15))`,
          borderRadius: '0 0 0 60%',
          zIndex: 0,
        }}
      />

      {/* Background blobs — decorative circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
        style={{ background: `${PINK}33`, zIndex: 0 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
        style={{ background: `${BLUE}33`, zIndex: 0 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN — text ── */}
          <div className="relative z-10">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6"
              style={{ background: `${PINK}1A`, color: PINK }}
            >
              <Sparkles size={16} strokeWidth={2.5} />
              Depuis 1982, pour les jeunes de RDP
            </div>

            {/* H1 */}
            <h1 className="font-black text-4xl md:text-6xl leading-tight text-gray-900" style={{ fontWeight: 900 }}>
              Ta place.<br />
              Tes idées.<br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${BLUE})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ta maison.
              </span>
            </h1>

            {/* Paragraph */}
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              La Maison des jeunes de Rivière-des-Prairies, c'est un lieu gratuit et bienveillant pour créer, apprendre, s'exprimer et vivre des projets qui te ressemblent.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/activites"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)` }}
              >
                Découvrir les activités
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link
                to="/evenements"
                className="inline-flex items-center gap-2 rounded-full border-2 bg-transparent px-8 py-4 font-semibold transition-colors hover:bg-pink-50"
                style={{ borderColor: PINK, color: PINK }}
              >
                <Calendar size={18} strokeWidth={2.5} />
                Prochains événements
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN — image ── */}
          <div className="relative z-10 mt-12 lg:mt-0">
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

              {/* Floating card 1 — bottom-left */}
              <div
                className="animate-float-slow absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-3 flex items-center gap-3 z-10"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: ORANGE }}>
                  <Trophy size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">+ de</div>
                  <div className="font-bold text-gray-900 text-sm">500+ jeunes/an</div>
                </div>
              </div>

              {/* Floating card 2 — top-right */}
              <div
                className="animate-float-slow absolute top-6 right-6 bg-white rounded-2xl px-5 py-3 flex items-center gap-3 z-10"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)', animationDelay: '2s' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: BLUE }}>
                  <Sparkles size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">40+</div>
                  <div className="text-gray-400 text-xs">activités/mois</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
