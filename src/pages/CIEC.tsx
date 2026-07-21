import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'
const DARK   = '#3D3D3D'

const heroStats = [
  { value: '12',   label: 'semaines' },
  { value: '8-12', label: 'jeunes/cohorte' },
  { value: '100%', label: 'gratuit' },
  { value: '30+',  label: 'mentors' },
]

const features = [
  "Développer ton idée d'affaires",
  'Créer ton plan d\'action',
  'Pitcher devant un jury',
  'Rejoindre un réseau de jeunes entrepreneurs',
]

const steps = [
  { num: '01', color: PINK,   title: 'Idéation',     text: 'Trouve ton idée et valide ton concept avec ton équipe.' },
  { num: '02', color: ORANGE, title: 'Planification', text: 'Crée ton plan d\'affaires et définis ta stratégie.' },
  { num: '03', color: BLUE,   title: 'Exécution',     text: 'Lance ton projet, vends et gère ta mini-coopérative.' },
  { num: '04', color: DARK,   title: 'Pitch final',   text: 'Présente ton projet devant un jury de professionnels.' },
]

export default function CIEC() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-24 md:py-32 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${PINK} 0%, ${BLUE} 100%)` }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              LE PROGRAMME PHARE
            </p>
            <h1 className="mt-2 font-black text-5xl md:text-7xl leading-tight">
              CIEC
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mt-4 font-medium">
              Coopérative d'Innovation et d'Entrepreneuriat des jeunes
            </p>
            <p className="text-white/70 mt-6 text-lg max-w-2xl mx-auto">
              Un programme unique qui transforme les jeunes de RDP en entrepreneurs avant même le cégep.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <a
                href="#postuler"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold transition-opacity hover:opacity-90"
                style={{ color: PINK }}
              >
                Postuler maintenant
              </a>
              <a
                href="#savoir-plus"
                className="inline-flex items-center rounded-full border-2 border-white text-white px-8 py-4 font-semibold transition-opacity hover:opacity-80"
              >
                En savoir plus ↓
              </a>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
              {heroStats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl px-6 py-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  <div className="font-black text-3xl text-white">{value}</div>
                  <div className="text-white/70 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — WHAT IS CIEC ── */}
        <section id="savoir-plus" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — text */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
                  C'EST QUOI LA CIEC?
                </p>
                <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900">
                  Entreprendre avant le cégep.
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  La CIEC est un programme d'entrepreneuriat jeunesse de 12 semaines où les participants apprennent à créer et gérer leur propre coopérative.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Encadrés par des mentors du milieu des affaires, les jeunes développent des compétences concrètes en gestion, marketing et leadership.
                </p>
                <div className="flex flex-col gap-3 mt-6">
                  {features.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} strokeWidth={2.5} style={{ color: ORANGE }} className="shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — image placeholder */}
              <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                <span className="text-gray-400 select-none">📸 Photo CIEC</span>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3 — PROGRAM STEPS ── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-center" style={{ color: PINK }}>
              LE PARCOURS
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-4xl text-gray-900 text-center mb-12">
              12 semaines pour devenir entrepreneur·e.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map(({ num, color, title, text }) => (
                <div key={num} className="bg-white rounded-2xl p-8 border border-gray-100">
                  <div className="font-black text-4xl" style={{ color }}>{num}</div>
                  <h3 className="font-bold text-gray-900 mt-3">{title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — TESTIMONIAL ── */}
        <section
          className="py-20"
          style={{ background: 'linear-gradient(135deg, rgba(251,176,64,0.06), rgba(240,80,99,0.06))' }}
        >
          <div className="max-w-3xl mx-auto text-center px-4">
            <div className="font-black text-6xl leading-none" style={{ color: PINK }}>"</div>
            <p className="font-medium text-xl text-gray-800 leading-relaxed mt-4">
              La CIEC m'a appris à croire en mes idées. J'ai lancé mon premier projet à 15 ans grâce à ce programme incroyable.
            </p>
            <div className="flex items-center gap-4 justify-center mt-8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
              >
                KB
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Karim B.</p>
                <p className="text-gray-400 text-sm">Ancien participant CIEC 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — CTA ── */}
        <section
          id="postuler"
          className="py-20 text-center text-white"
          style={{ background: `linear-gradient(135deg, ${PINK}, ${BLUE})` }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-black text-4xl md:text-5xl">
              Prêt·e à entreprendre?
            </h2>
            <p className="text-white/80 mt-4 text-lg">
              Les candidatures pour la prochaine cohorte sont ouvertes. Places limitées!
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <a
                href="#postuler"
                className="inline-flex items-center rounded-full bg-white px-10 py-4 text-lg font-bold transition-opacity hover:opacity-90"
                style={{ color: PINK }}
              >
                Postuler maintenant
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border-2 border-white text-white px-10 py-4 font-semibold transition-opacity hover:opacity-80"
              >
                Nous contacter
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
