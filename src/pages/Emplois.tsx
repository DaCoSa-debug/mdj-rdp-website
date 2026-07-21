import { Link } from 'react-router-dom'
import { MapPin, Clock, Calendar } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'

const jobs = [
  {
    badge:       'TEMPS PLEIN',
    badgeStyle:  'bg-green-100 text-green-700',
    title:       'Intervenant·e jeunesse',
    location:    'Rivière-des-Prairies, Montréal',
    hours:       '35h/semaine',
    contract:    'Poste permanent',
    description: 'Accompagner et soutenir les jeunes de 12 à 17 ans dans leur développement personnel et social au sein de la MDJ-RDP.',
    ctaLabel:    "Voir l'offre complète →",
  },
  {
    badge:       'TEMPS PARTIEL',
    badgeStyle:  'bg-blue-100 text-blue-700',
    title:       'Animateur·trice sportif·ve',
    location:    'Rivière-des-Prairies',
    hours:       '15-20h/semaine',
    contract:    'Poste saisonnier',
    description: 'Planifier et animer des activités sportives (basketball, soccer, volleyball) pour les jeunes membres de la MDJ.',
    ctaLabel:    "Voir l'offre complète →",
  },
  {
    badge:       'BÉNÉVOLAT',
    badgeStyle:  'bg-orange-100 text-orange-700',
    title:       'Mentor·e CIEC',
    location:    'En personne & virtuel',
    hours:       'Flexible',
    contract:    'Bénévolat',
    description: "Partage ton expertise entrepreneuriale avec les jeunes participants de la CIEC. Accompagne-les dans leurs projets d'affaires.",
    ctaLabel:    "Voir l'offre →",
  },
]

const volunteerItems = [
  { emoji: '🎓', label: 'Tutorat & aide aux devoirs' },
  { emoji: '🏀', label: 'Animation sportive' },
  { emoji: '💼', label: 'Mentorat CIEC' },
]

export default function Emplois() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(251,176,64,0.08), rgba(0,174,239,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>
              CARRIÈRES
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              Rejoins l'équipe MDJ-RDP.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
              Travaille pour une cause qui compte. Aide les jeunes de Rivière-des-Prairies à s'épanouir.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — JOB LISTINGS ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              POSTES OUVERTS
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900 mb-12">
              Offres d'emploi.
            </h2>

            <div className="flex flex-col gap-6">
              {jobs.map(({ badge, badgeStyle, title, location, hours, contract, description, ctaLabel }) => (
                <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeStyle}`}>
                    {badge}
                  </span>
                  <h3 className="font-bold text-xl text-gray-900 mt-3">{title}</h3>
                  <div className="flex flex-wrap gap-6 mt-2 text-gray-500 text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} strokeWidth={2} />
                      {location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} strokeWidth={2} />
                      {hours}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} strokeWidth={2} />
                      {contract}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">{description}</p>
                  <a
                    href="#"
                    className="mt-4 inline-block text-sm font-semibold hover:opacity-70 transition-opacity"
                    style={{ color: PINK }}
                  >
                    {ctaLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — VOLUNTEER ── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>
              BÉNÉVOLAT
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900">
              Donne de ton temps.
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl">
              Même quelques heures par mois peuvent faire une grande différence dans la vie d'un jeune.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {volunteerItems.map(({ emoji, label }) => (
                <div key={label} className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — CTA ── */}
        <section
          className="py-20 text-center text-white"
          style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-black text-4xl">Intéressé·e?</h2>
            <p className="text-white/80 mt-4">
              Envoie ton CV et une lettre de motivation à notre équipe RH.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 font-bold transition-opacity hover:opacity-90"
              style={{ color: PINK }}
            >
              Postuler maintenant
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
