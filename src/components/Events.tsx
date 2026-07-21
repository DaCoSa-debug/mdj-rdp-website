const PINK = '#F05063'

interface Event {
  day: string
  month: string
  category: string
  categoryStyle: string
  title: string
  sub: string
}

const events: Event[] = [
  {
    day: '11',
    month: 'NOV',
    category: 'SPORT',
    categoryStyle: 'bg-orange-100 text-orange-600',
    title: 'Tournoi de basketball inter-MDJ',
    sub: 'Gym MDJ · 14h–17h',
  },
  {
    day: '15',
    month: 'NOV',
    category: 'CULTURE',
    categoryStyle: 'bg-blue-100 text-blue-600',
    title: 'Soirée cinéma en plein air',
    sub: 'Cour MDJ · 19h–22h',
  },
  {
    day: '20',
    month: 'NOV',
    category: 'ATELIER',
    categoryStyle: 'bg-green-100 text-green-600',
    title: 'Atelier cuisine du monde',
    sub: 'Cuisine MDJ · 15h–18h',
  },
  {
    day: '02',
    month: 'DÉC',
    category: 'CIEC',
    categoryStyle: 'bg-pink-100 text-pink-600',
    title: 'Lancement officiel du CIEC 2026',
    sub: 'Salle principale · 10h–12h',
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
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`flex items-center gap-6 py-5 ${i < events.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              {/* Date box */}
              <div className="min-w-[56px] text-center shrink-0">
                <div className="font-black text-2xl text-gray-900 leading-none">{event.day}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-0.5">{event.month}</div>
              </div>

              {/* Category badge + title + sub */}
              <div className="flex-1 min-w-0">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${event.categoryStyle}`}>
                  {event.category}
                </span>
                <p className="font-semibold text-gray-900 mt-1">{event.title}</p>
                <p className="text-gray-400 text-sm mt-1">{event.sub}</p>
              </div>

              {/* Register link */}
              <a
                href="#"
                className="ml-auto shrink-0 text-sm font-semibold whitespace-nowrap hover:opacity-70 transition-opacity"
                style={{ color: PINK }}
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
