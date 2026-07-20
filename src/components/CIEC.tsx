import { CheckCircle } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'

const learningItems = [
  "Développer ton idée d'affaires",
  "Créer ton plan d'action",
  'Pitcher devant un jury',
  'Rejoindre un réseau de jeunes entrepreneurs',
]

const statPills = ['50+ jeunes', '12 semaines', '100% gratuit']

export default function CIEC() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: `linear-gradient(135deg, ${PINK} 0%, #00AEEF 100%)` }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Programme phare
            </p>
            <h2 className="mt-2 font-black text-4xl md:text-6xl text-white">
              La CIEC
            </h2>
            <p className="mt-2 text-xl text-white/80">
              Carrefour d'Innovation et d'Entrepreneuriat des Jeunes
            </p>
            <p className="mt-4 text-white/80 leading-relaxed">
              Un programme unique qui accompagne les jeunes entrepreneurs de RDP
              dans la réalisation de leurs projets d'affaires.
            </p>

            {/* Stat pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              {statPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full px-6 py-3 font-semibold text-white"
                  style={{ background: 'rgba(255,255,255,0.20)' }}
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="#"
              className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 font-bold transition-opacity hover:opacity-90"
              style={{ color: PINK }}
            >
              En savoir plus sur la CIEC
            </a>
          </div>

          {/* RIGHT — learning card */}
          <div
            className="rounded-[2.5rem] p-8 border"
            style={{
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(255,255,255,0.20)',
            }}
          >
            <h3 className="font-bold text-white text-xl mb-6">
              Ce que tu vas apprendre
            </h3>
            <ul className="space-y-4">
              {learningItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={22}
                    strokeWidth={2}
                    className="shrink-0 mt-0.5"
                    style={{ color: ORANGE }}
                  />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
