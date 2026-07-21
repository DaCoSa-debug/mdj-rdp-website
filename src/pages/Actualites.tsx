import { Calendar, Clock } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK = '#F05063'

const articles = [
  {
    gradient:  'from-blue-100 to-purple-100',
    category:  'SPORT',
    badgeStyle:'bg-orange-100 text-orange-600',
    title:     'L\'équipe de basketball MDJ remporte le tournoi régional',
    excerpt:   'Une victoire historique pour nos jeunes athlètes...',
    meta:      '8 nov. 2024 · 2 min',
  },
  {
    gradient:  'from-green-100 to-blue-100',
    category:  'PROGRAMME',
    badgeStyle:'bg-blue-100 text-blue-600',
    title:     'Nouveau partenariat avec la Ville de Montréal pour les programmes jeunesse',
    excerpt:   'La MDJ-RDP annonce un partenariat stratégique...',
    meta:      '1 nov. 2024 · 4 min',
  },
  {
    gradient:  'from-yellow-100 to-orange-100',
    category:  'COMMUNAUTÉ',
    badgeStyle:'bg-yellow-100 text-yellow-600',
    title:     'La MDJ-RDP fête ses 40 ans avec toute la communauté de RDP',
    excerpt:   'Une célébration inoubliable pour marquer 4 décennies...',
    meta:      '24 oct. 2024 · 3 min',
  },
]

export default function Actualites() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,174,239,0.08), rgba(251,176,64,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              ACTUALITÉS
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              Les dernières nouvelles de la MDJ.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
              Reste informé des nouveautés, projets et succès de la communauté MDJ-RDP.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — FEATURED ARTICLE ── */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide mb-6" style={{ color: PINK }}>
              À LA UNE
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — image */}
              <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100">
                <div className="absolute top-4 left-4 bg-[#F05063] text-white rounded-full px-4 py-2 text-xs font-bold">
                  NOUVEAU
                </div>
              </div>

              {/* Right — text */}
              <div>
                <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-3 py-1 text-xs font-bold">
                  CIEC
                </span>
                <h2 className="mt-3 font-black text-2xl md:text-3xl text-gray-900">
                  La cohorte CIEC 2024 présente ses projets devant 200 personnes!
                </h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Pour la 10e année consécutive, les jeunes entrepreneurs de la CIEC ont présenté leurs projets d'affaires devant un jury composé d'entrepreneurs et de professionnels de Montréal.
                </p>
                <div className="mt-4 flex gap-4 text-gray-400 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} strokeWidth={2} />
                    15 novembre 2024
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} strokeWidth={2} />
                    3 min de lecture
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-6 inline-block font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: PINK }}
                >
                  Lire l'article complet →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3 — ARTICLES GRID ── */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-bold text-2xl text-gray-900 mb-8">Toutes les actualités</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map(({ gradient, category, badgeStyle, title, excerpt, meta }) => (
                <div key={title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className={`aspect-[16/9] bg-gradient-to-br ${gradient}`} />
                  <div className="p-6">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeStyle}`}>
                      {category}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-3 leading-snug">{title}</h3>
                    <p className="text-gray-500 text-sm mt-2">{excerpt}</p>
                    <p className="text-gray-400 text-xs mt-3">{meta}</p>
                    <a
                      href="#"
                      className="mt-4 inline-block font-semibold text-sm hover:opacity-70 transition-opacity"
                      style={{ color: PINK }}
                    >
                      Lire →
                    </a>
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
