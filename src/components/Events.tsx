import { Trophy, Music2, Utensils, Rocket, MapPin, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const GREEN  = '#16a34a'

interface Event {
  day: string
  month: string
  category: string
  categoryLabel: string
  categoryStyle: string
  CategoryIcon: LucideIcon
  dateBoxBg: string
  dateColor: string
  title: string
  location: string
  time: string
}

const events: Event[] = [
  {
    day:           '12',
    month:         'JUIL',
    category:      'SPORT',
    categoryLabel: 'SPORT',
    categoryStyle: 'text-orange-600',
    CategoryIcon:  Trophy,
    dateBoxBg:     'bg-orange-50',
    dateColor:     ORANGE,
    title:         'Tournoi de basketball inter-MDJ',
    location:      'Parc RDP',
    time:          '13h – 17h',
  },
  {
    day:           '19',
    month:         'JUIL',
    category:      'CULTURE',
    categoryLabel: 'CULTURE',
    categoryStyle: 'text-pink-600',
    CategoryIcon:  Music2,
    dateBoxBg:     'bg-pink-50',
    dateColor:     PINK,
    title:         'Soirée cinéma en plein air',
    location:      'Cour de la MDJ',
    time:          '20h',
  },
  {
    day:           '26',
    month:         'JUIL',
    category:      'ATELIER',
    categoryLabel: 'VIE SOCIALE',
    categoryStyle: 'text-green-600',
    CategoryIcon:  Utensils,
    dateBoxBg:     'bg-green-50',
    dateColor:     GREEN,
    title:         'Atelier cuisine du monde',
    location:      'Cuisine MDJ',
    time:          '17h – 20h',
  },
  {
    day:           '02',
    month:         'AOÛT',
    category:      'CIEC',
    categoryLabel: 'CIEC',
    categoryStyle: 'text-yellow-600',
    CategoryIcon:  Rocket,
    dateBoxBg:     'bg-yellow-50',
    dateColor:     ORANGE,
    title:         'Lancement officiel du CIEC 2026',
    location:      'Salle multi',
    time:          '18h',
  },
]

export default function Events() {
  return (
    <section id="events" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              CE MOIS-CI
            </p>
            <h2 className="mt-2 font-black text-4xl md:text-5xl text-gray-900">
              Ce mois-ci à la MDJ.
            </h2>
          </div>
          <a
            href="#"
            className="mt-2 text-sm font-semibold whitespace-nowrap hover:opacity-70 transition-opacity"
            style={{ color: PINK }}
          >
            Voir tout le calendrier →
          </a>
        </div>

        {/* Event rows */}
        <div className="mt-10">
          {events.map(({ day, month, categoryLabel, categoryStyle, CategoryIcon, dateBoxBg, dateColor, title, location, time }, i) => (
            <div
              key={title}
              className={`flex items-center gap-6 py-5 ${i < events.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              {/* Date box — colored bg */}
              <div className={`min-w-[64px] rounded-2xl px-3 py-3 text-center shrink-0 ${dateBoxBg}`}>
                <div className="font-black text-2xl leading-none" style={{ color: dateColor }}>{day}</div>
                <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: dateColor, opacity: 0.7 }}>{month}</div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Category with icon */}
                <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide ${categoryStyle}`}>
                  <CategoryIcon size={12} strokeWidth={2.5} />
                  {categoryLabel}
                </div>
                <p className="font-semibold text-gray-900 mt-1">{title}</p>
                {/* Location */}
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} strokeWidth={2} className="text-gray-400 shrink-0" />
                  <span className="text-gray-400 text-sm">{location}</span>
                </div>
                {/* Time */}
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={12} strokeWidth={2} className="text-gray-400 shrink-0" />
                  <span className="text-gray-400 text-sm">{time}</span>
                </div>
              </div>

              {/* Register button */}
              <a
                href="#"
                className="ml-auto flex-shrink-0 border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 hover:border-[#F05063] hover:text-[#F05063] transition-colors whitespace-nowrap"
              >
                S'inscrire →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
