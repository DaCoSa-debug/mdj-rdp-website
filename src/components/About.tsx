const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'
const DARK   = '#3D3D3D'

const items = [
  {
    num: '01',
    color: PINK,
    title: 'Écoute',
    text: 'Nos intervenants sont formés et disponibles pour vous accompagner.',
  },
  {
    num: '02',
    color: ORANGE,
    title: 'Gratuité',
    text: '100% des activités et services sont entièrement gratuits pour toi.',
  },
  {
    num: '03',
    color: BLUE,
    title: 'Inclusion',
    text: 'Un espace ouvert à tous, peu importe ton origine ou ton parcours.',
  },
  {
    num: '04',
    color: DARK,
    title: 'Confiance',
    text: 'Un espace sécuritaire où tu peux être toi-même sans jugement.',
  },
]

export default function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left col — header */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              CE QUI NOUS ANIME
            </p>
            <h2 className="mt-2 font-black text-4xl md:text-5xl text-gray-900">
              Ce qui nous anime.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Depuis plus de 40 ans, la MDJ-RDP porte quatre engagements forts et structurants pour ses membres.
            </p>
          </div>

          {/* Right col — numbered items */}
          <div className="grid grid-cols-2 gap-8">
            {items.map(({ num, color, title, text }) => (
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
  )
}
