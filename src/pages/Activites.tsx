import { Link } from 'react-router-dom'
import { Trophy, Palette, Rocket } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

const categories = [
  {
    band:       ORANGE,
    iconBg:     'bg-orange-100',
    Icon:       Trophy,
    iconColor:  ORANGE,
    title:      'Sport & Plein air',
    text:       'Basketball, soccer, volleyball, plein air et activités sportives pour bouger et se dépasser.',
    activities: ['Basketball inter-MDJ', 'Soccer en plein air', 'Volleyball', 'Randonnée & plein air'],
    ctaColor:   ORANGE,
  },
  {
    band:       PINK,
    iconBg:     'bg-pink-100',
    Icon:       Palette,
    iconColor:  PINK,
    title:      'Art & Musique',
    text:       'Musique, danse, arts visuels, théâtre. Exprime ta créativité dans un espace pensé pour toi.',
    activities: ['Musique & chant', 'Arts visuels', 'Danse', 'Théâtre & impro'],
    ctaColor:   PINK,
  },
  {
    band:       BLUE,
    iconBg:     'bg-blue-100',
    Icon:       Rocket,
    iconColor:  BLUE,
    title:      'Entrepreneuriat',
    text:       'Développe tes compétences en affaires et rejoins la CIEC pour lancer ton projet.',
    activities: ['CIEC program', 'Pitch & présentation', 'Mentorat', 'Réseau jeunesse'],
    ctaColor:   BLUE,
  },
]

const extras = [
  { emoji: '🎮', label: 'Jeux & Arcade' },
  { emoji: '📚', label: 'Aide aux devoirs' },
  { emoji: '🎬', label: 'Cinéma & Sorties' },
  { emoji: '🍳', label: 'Cuisine du monde' },
  { emoji: '🎵', label: 'Ateliers créatifs' },
  { emoji: '✈️', label: 'Voyages & Sorties' },
  { emoji: '💻', label: 'Initiation numérique' },
  { emoji: '🤝', label: 'Bénévolat' },
]

export default function Activites() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 md:py-28 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(251,176,64,0.08), rgba(240,80,99,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>
              NOS ACTIVITÉS
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              Trouve ton terrain de jeu.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
              Sport, arts, entrepreneuriat, sorties et bien plus. Il y a forcément quelque chose pour toi à la MDJ-RDP.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — CATEGORIES ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-center" style={{ color: PINK }}>
              PAR CATÉGORIE
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900 text-center mb-12">
              Explore nos programmes.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map(({ band, iconBg, Icon, iconColor, title, text, activities, ctaColor }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Top color band */}
                  <div className="h-2" style={{ background: band }} />
                  <div className="p-8">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}>
                      <Icon size={24} strokeWidth={2} style={{ color: iconColor }} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">{title}</h3>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{text}</p>
                    {/* Activities list */}
                    <div className="mt-4 flex flex-col gap-1">
                      {activities.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: band }} />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-sm font-semibold cursor-pointer" style={{ color: ctaColor }}>
                      Explorer →
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — OTHER ACTIVITIES ── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              ET AUSSI
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900 mb-12">
              D'autres façons de s'épanouir.
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {extras.map(({ emoji, label }) => (
                <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
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
            <h2 className="font-black text-4xl">
              Prêt·e à te joindre à nous?
            </h2>
            <p className="text-white/80 mt-4">
              Toutes nos activités sont gratuites pour les jeunes de 12 à 17 ans de Rivière-des-Prairies.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold transition-opacity hover:opacity-90"
                style={{ color: PINK }}
              >
                S'inscrire maintenant
              </Link>
              <Link
                to="/evenements"
                className="inline-flex items-center rounded-full border-2 border-white text-white px-8 py-4 font-semibold transition-opacity hover:opacity-80"
              >
                Voir le calendrier
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
