import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'
const DARK   = '#3D3D3D'

const values = [
  { num: '01', color: PINK,   title: 'Écoute',    text: 'Nos intervenants sont formés et disponibles pour vous accompagner.' },
  { num: '02', color: ORANGE, title: 'Gratuité',  text: '100% des activités et services sont entièrement gratuits pour toi.' },
  { num: '03', color: BLUE,   title: 'Inclusion', text: 'Un espace ouvert à tous, peu importe ton origine ou ton parcours.' },
  { num: '04', color: DARK,   title: 'Confiance', text: 'Un espace sécuritaire où tu peux être toi-même sans jugement.' },
]

const team = [
  { initials: 'DG', gradient: `from-[#FBB040] to-[#F05063]`, name: 'Direction générale',     role: 'Leadership et vision' },
  { initials: 'IN', gradient: `from-[#F05063] to-[#00AEEF]`, name: 'Intervention jeunesse',  role: 'Accompagnement et soutien' },
  { initials: 'AN', gradient: `from-[#00AEEF] to-[#FBB040]`, name: 'Animation et programmes', role: 'Activités et ateliers' },
]

const timeline = [
  { year: '1982', color: PINK,   title: 'Fondation de la MDJ-RDP',  text: "Création de l'organisme pour répondre aux besoins des jeunes de RDP." },
  { year: '1995', color: ORANGE, title: 'Expansion des programmes',  text: 'Développement des activités sportives et culturelles.' },
  { year: '2010', color: BLUE,   title: 'Lancement de la CIEC',      text: "Création du programme d'entrepreneuriat jeunesse." },
  { year: '2024', color: DARK,   title: 'Refonte numérique',         text: 'Nouveau site web et présence digitale renforcée.' },
]

export default function QuiSommesNous() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — PAGE HERO ── */}
        <section
          className="py-20 md:py-28 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(251,176,64,0.08), rgba(240,80,99,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              À PROPOS
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900 max-w-3xl mx-auto">
              Notre mission, nos valeurs, notre histoire.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
              Depuis 1982, la Maison des jeunes de Rivière-des-Prairies accompagne les jeunes de 12 à 17 ans dans leur développement personnel et social.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — MISSION ── */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — text */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
                  NOTRE MISSION
                </p>
                <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900">
                  Un espace bâti pour toi.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  La MDJ-RDP est un organisme communautaire à but non lucratif qui offre un milieu de vie sain, sécuritaire et stimulant pour les jeunes de Rivière-des-Prairies.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Nous croyons que chaque jeune a le potentiel de s'épanouir lorsqu'il est entouré des bonnes personnes et des bons outils.
                </p>
                <Link
                  to="/activites"
                  className="mt-8 inline-flex items-center rounded-full px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)` }}
                >
                  Découvrir nos programmes
                </Link>
              </div>

              {/* Right — image placeholder */}
              <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                <span className="text-gray-400 select-none">📸 Photo équipe MDJ</span>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3 — VALUES ── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left — header */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
                  NOS VALEURS
                </p>
                <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900">
                  Ce qui nous guide.
                </h2>
              </div>

              {/* Right — numbered items */}
              <div className="grid grid-cols-2 gap-8">
                {values.map(({ num, color, title, text }) => (
                  <div key={num}>
                    <div className="font-black text-4xl" style={{ color }}>{num}</div>
                    <div className="w-8 h-1 rounded-full mt-1 mb-3" style={{ background: color }} />
                    <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{text}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 4 — TEAM ── */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              L'ÉQUIPE
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900">
              Des gens passionnés pour les jeunes.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
              {team.map(({ initials, gradient, name, role }) => (
                <div key={initials} className="text-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} mx-auto flex items-center justify-center text-white font-black text-2xl`}
                  >
                    {initials}
                  </div>
                  <p className="font-bold text-gray-900 mt-4">{name}</p>
                  <p className="text-gray-400 text-sm mt-1">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — HISTORY TIMELINE ── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              NOTRE HISTOIRE
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900 mb-12">
              40 ans au service des jeunes.
            </h2>

            <div className="flex flex-col gap-0 max-w-2xl mx-auto">
              {timeline.map(({ year, color, title, text }, i) => (
                <div key={year}>
                  <div className="flex gap-6 items-start">
                    <div className="min-w-[60px] font-black text-xl" style={{ color }}>{year}</div>
                    <div>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-gray-500 text-sm mt-1">{text}</p>
                    </div>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="border-l-2 border-gray-200 ml-[29px] h-8 my-2" />
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
