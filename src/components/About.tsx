const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'
const DARK   = '#3D3D3D'

const items = [
  {
    num: '01',
    color: PINK,
    title: 'Écoute',
    text: 'Ton avis compte. On construit avec toi, pas pour toi.',
  },
  {
    num: '02',
    color: ORANGE,
    title: 'Gratuité',
    text: '100% des activités sans frais. Zéro barrière.',
  },
  {
    num: '03',
    color: BLUE,
    title: 'Inclusion',
    text: "Peu importe d'où tu viens, tu es chez toi.",
  },
  {
    num: '04',
    color: DARK,
    title: 'Confiance',
    text: 'Un espace sécuritaire, animé par des adultes formés.',
  },
]

export default function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header — full width, text-left */}
        <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
          CE QUI NOUS ANIME
        </p>
        <h2 className="mt-2 font-black text-4xl md:text-5xl">
          <span className="text-gray-900">Ce qui </span>
          <span style={{ color: ORANGE }}>nous </span>
          <span style={{ color: PINK }}>anime.</span>
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Depuis plus de 30 ans, la MDJ-RDP porte quatre engagements simples et non-négociables.
        </p>

        {/* Items — single row with dividers */}
        <div className="mt-10 border border-gray-200 rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4">
          {items.map(({ num, color, title, text }, i) => (
            <div
              key={num}
              className={`p-8 ${i < items.length - 1 ? 'border-r border-gray-200' : ''}`}
            >
              <div className="font-black text-4xl" style={{ color }}>{num}</div>
              <div className="w-8 h-1 rounded-full mt-1 mb-4" style={{ background: color }} />
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
