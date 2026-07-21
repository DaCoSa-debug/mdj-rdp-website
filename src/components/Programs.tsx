import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const ORANGE = '#FBB040'

type TabId = 'sport' | 'art' | 'entrepreneuriat'

interface TabContent {
  imageBg: string
  imageLabel: string
  heading: string
  body: string
  items: string[]
}

const content: Record<TabId, TabContent> = {
  sport: {
    imageBg:    'from-orange-100 to-pink-100',
    imageLabel: 'Sport',
    heading:    'Bouger, jouer, se dépasser',
    body:       'Basketball, soccer, volleyball, plein air et bien plus. On bouge ensemble pour se dépasser et faire des rencontres inoubliables.',
    items:      ['Basketball inter-MDJ', 'Soccer en plein air', 'Danse & fitness'],
  },
  art: {
    imageBg:    'from-purple-100 to-pink-100',
    imageLabel: 'Art & Musique',
    heading:    "Créer, exprimer, s'inspirer",
    body:       "Musique, danse, arts visuels, théâtre. Exprime ta créativité dans un espace pensé pour toi.",
    items:      ['Musique & chant', 'Arts visuels', 'Théâtre & impro'],
  },
  entrepreneuriat: {
    imageBg:    'from-blue-100 to-green-100',
    imageLabel: 'Entrepreneuriat',
    heading:    'Entreprendre avant le cégep',
    body:       'Développe tes compétences en affaires, lance tes propres projets et rejoins un réseau de jeunes leaders.',
    items:      ['CIEC program', 'Pitch & présentation', 'Mentorat'],
  },
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'sport',           label: 'Sport' },
  { id: 'art',             label: 'Art & Musique' },
  { id: 'entrepreneuriat', label: 'Entrepreneuriat' },
]

export default function Programs() {
  const [activeTab, setActiveTab] = useState<TabId>('sport')
  const tab = content[activeTab]

  return (
    <section id="programs" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>
          TES ACTIVITÉS
        </p>
        <h2 className="mt-2 font-black text-4xl md:text-5xl text-gray-900">
          Trouve ton terrain de jeu.
        </h2>

        {/* 2-col grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — image placeholder */}
          <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${tab.imageBg}`}>
            {/* Orange overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-orange-400/20 rounded-3xl"
            />
            {/* Label bottom-left */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-full px-4 py-2 text-sm font-semibold text-gray-700">
              {tab.imageLabel}
            </div>
          </div>

          {/* RIGHT — tabs + content */}
          <div>
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    activeTab === id
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={activeTab === id ? { background: ORANGE } : undefined}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <h3 className="font-black text-3xl text-gray-900">{tab.heading}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{tab.body}</p>

            {/* Feature items */}
            <div className="flex flex-col gap-2 mt-4">
              {tab.items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} strokeWidth={2.5} style={{ color: ORANGE }} />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className="inline-block mt-6 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: ORANGE }}
            >
              Voir toutes les activités →
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
