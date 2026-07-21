import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Heart, Users, ChevronDown } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

const reassurance = [
  {
    Icon:  Shield,
    color: BLUE,
    title: 'Sécuritaire',
    text:  'Un environnement surveillé et bienveillant, avec des intervenants formés en protection de la jeunesse.',
  },
  {
    Icon:  Heart,
    color: PINK,
    title: 'Gratuit',
    text:  'Tous nos services sont 100% gratuits pour les jeunes de 12 à 17 ans résidant à Rivière-des-Prairies.',
  },
  {
    Icon:  Users,
    color: ORANGE,
    title: 'Encadré',
    text:  "Une équipe professionnelle d'intervenants qualifiés assure le suivi et le bien-être de chaque jeune.",
  },
]

const faqs = [
  {
    q: 'Quel âge faut-il avoir pour fréquenter la MDJ-RDP?',
    a: 'La MDJ-RDP accueille les jeunes de 12 à 17 ans résidant à Rivière-des-Prairies et dans les quartiers avoisinants.',
  },
  {
    q: 'Est-ce vraiment gratuit?',
    a: "Oui, absolument! Tous nos programmes, activités et services sont entièrement gratuits pour les membres. Il suffit de s'inscrire.",
  },
  {
    q: "Quels sont les horaires d'ouverture?",
    a: 'Nous sommes ouverts du lundi au vendredi de 15h à 21h, et le samedi de 10h à 17h. Les horaires peuvent varier selon les activités.',
  },
  {
    q: 'Comment mon enfant peut-il s\'inscrire?',
    a: "L'inscription se fait directement à la MDJ-RDP ou via notre formulaire en ligne. Il suffit d'une pièce d'identité et d'une preuve de résidence.",
  },
  {
    q: 'Y a-t-il des intervenants qualifiés sur place?',
    a: "Oui, notre équipe est composée d'intervenants en travail social et animation, tous formés pour accompagner les jeunes dans un cadre sécuritaire.",
  },
]

export default function EspaceParents() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,174,239,0.08), rgba(240,80,99,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              ESPACE PARENTS
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              Votre enfant entre de bonnes mains.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur la MDJ-RDP pour accompagner votre jeune en toute confiance.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — REASSURANCE ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reassurance.map(({ Icon, color, title, text }) => (
                <div key={title} className="text-center">
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-6"
                    style={{ background: `${color}1A` }}
                  >
                    <Icon size={24} strokeWidth={2} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{title}</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — FAQ ── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              QUESTIONS FRÉQUENTES
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900 mb-12">
              Vos questions, nos réponses.
            </h2>

            <div className="max-w-3xl mx-auto">
              {faqs.map(({ q, a }, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 py-5 cursor-pointer"
                  onClick={() => toggle(i)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900 pr-4">{q}</p>
                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      className={`shrink-0 text-gray-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openIndex === i && (
                    <p className="text-gray-600 text-sm leading-relaxed mt-3">{a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — CONTACT PARENTS ── */}
        <section
          className="py-20"
          style={{ background: 'linear-gradient(135deg, rgba(251,176,64,0.08), rgba(240,80,99,0.08))' }}
        >
          <div className="max-w-2xl mx-auto text-center px-4">
            <h2 className="font-black text-3xl text-gray-900">Une question pour nous?</h2>
            <p className="mt-4 text-gray-500">
              Notre équipe est disponible pour répondre à toutes vos questions concernant les programmes et le bien-être de votre jeune.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full px-8 py-4 font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
              >
                Nous contacter
              </Link>
              <a
                href="tel:5140000000"
                className="inline-flex items-center rounded-full border-2 px-8 py-4 font-bold transition-colors hover:bg-pink-50"
                style={{ borderColor: PINK, color: PINK }}
              >
                Appeler la MDJ
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
