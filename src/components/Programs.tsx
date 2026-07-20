import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'

type TabId = 'sport' | 'art' | 'entrepreneuriat'

interface Tab {
  id: TabId
  label: string
}

interface TabContent {
  imageBg: string
  imageLabel: string
  heading: string
  body: string
  pills: string[]
  cta: string
}

const tabs: Tab[] = [
  { id: 'sport',          label: 'Sport' },
  { id: 'art',            label: 'Art & Culture' },
  { id: 'entrepreneuriat', label: 'Entrepreneuriat' },
]

const content: Record<TabId, TabContent> = {
  sport: {
    imageBg:    'from-orange-100 to-pink-100',
    imageLabel: '📸 activity-sport.jpg',
    heading:    'Bouger, jouer, se dépasser',
    body:       'Basketball, soccer, volleyball, plein air et bien plus. On bouge ensemble!',
    pills:      ['Basketball', 'Soccer', 'Plein air'],
    cta:        'Voir le programme sport',
  },
  art: {
    imageBg:    'from-purple-100 to-pink-100',
    imageLabel: '📸 art-culture.jpg',
    heading:    "Créer, exprimer, s'inspirer",
    body:       'Musique, danse, arts visuels, théâtre. Exprime ta créativité!',
    pills:      ['Musique', 'Danse', 'Arts visuels'],
    cta:        'Voir le programme arts',
  },
  entrepreneuriat: {
    imageBg:    'from-blue-100 to-green-100',
    imageLabel: '📸 entrepreneuriat.jpg',
    heading:    'Entreprendre, innover, réussir',
    body:       'Développe tes compétences en affaires et lance tes propres projets.',
    pills:      ['CIEC', 'Pitch', 'Leadership'],
    cta:        'Voir le programme',
  },
}

export default function Programs() {
  const [activeTab, setActiveTab] = useState<TabId>('sport')
  const tab = content[activeTab]

  return (
    <section id="programs" className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
            Nos programmes
          </p>
          <h2 className="mt-2 font-black text-3xl md:text-5xl text-gray-900">
            Des activités pour tous les goûts
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {tabs.map(({ id, label }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className="rounded-full px-6 py-3 font-semibold transition-all"
                style={
                  active
                    ? { background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)`, color: '#fff', border: 'none' }
                    : { background: '#fff', color: '#4B5563', border: '1px solid #E5E7EB' }
                }
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — image placeholder */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${tab.imageBg} flex items-center justify-center`}>
              <span className="text-gray-400 text-lg select-none">{tab.imageLabel}</span>
            </div>
            {/* Orange overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl"
              style={{ background: `${ORANGE}33` }}
            />
          </div>

          {/* RIGHT — text */}
          <div>
            <h3 className="font-black text-2xl md:text-4xl text-gray-900 mb-4">
              {tab.heading}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {tab.body}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {tab.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-70"
              style={{ color: PINK }}
            >
              {tab.cta}
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
