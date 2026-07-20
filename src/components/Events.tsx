import { MapPin, Clock, ArrowRight } from 'lucide-react'

const PINK = '#F05063'

interface Event {
  day: string
  month: string
  category: string
  categoryStyle: string
  title: string
  location: string
  time: string
}

const events: Event[] = [
  {
    day: '15',
    month: 'Août',
    category: 'Sport',
    categoryStyle: 'bg-orange-100 text-orange-600',
    title: 'Tournoi de basketball inter-MDJ',
    location: 'Gymnase MDJ',
    time: '14h00 – 17h00',
  },
  {
    day: '22',
    month: 'Août',
    category: 'Culture',
    categoryStyle: 'bg-blue-100 text-blue-600',
    title: 'Atelier graffiti & art urbain',
    location: 'Salle créative',
    time: '13h00 – 16h00',
  },
  {
    day: '05',
    month: 'Sep',
    category: 'CIEC',
    categoryStyle: 'bg-pink-100 text-pink-600',
    title: 'Lancement CIEC automne 2025',
    location: 'Salle de conférence',
    time: '10h00 – 12h00',
  },
  {
    day: '12',
    month: 'Sep',
    category: 'Sortie',
    categoryStyle: 'bg-gray-100 text-gray-600',
    title: 'Sortie Ronde de Montréal',
    location: 'Départ MDJ-RDP',
    time: '09h00 – 18h00',
  },
]

export default function Events() {
  return (
    <section id="events" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              Agenda
            </p>
            <h2 className="mt-2 font-black text-3xl md:text-5xl text-gray-900">
              Prochains événements
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-semibold hover:underline shrink-0"
            style={{ color: PINK }}
          >
            Voir tout le calendrier
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>

        {/* Event rows */}
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex items-center gap-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Date box */}
              <div className="min-w-[64px] text-center bg-gray-50 rounded-xl px-3 py-2 shrink-0">
                <div className="font-black text-2xl text-gray-900 leading-none">{event.day}</div>
                <div className="text-xs font-semibold uppercase text-gray-400 mt-1">{event.month}</div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Category badge */}
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2 ${event.categoryStyle}`}>
                  {event.category}
                </span>
                {/* Title */}
                <p className="font-bold text-gray-900 text-lg leading-snug truncate">
                  {event.title}
                </p>
                {/* Location & time */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={14} strokeWidth={2} />
                    {event.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} strokeWidth={2} />
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Register link */}
              <a
                href="#"
                className="ml-auto shrink-0 text-sm font-semibold hover:underline"
                style={{ color: PINK }}
              >
                S'inscrire
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
