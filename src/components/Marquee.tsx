const PINK = '#F05063'

const items = [
  'Sport & Plein air',
  'Art & Culture',
  'Entrepreneuriat',
  'Aide aux devoirs',
  'Sorties & Voyages',
  'Ateliers créatifs',
  'Jeux & Arcade',
  'Soutien jeunesse',
]

function TickerItems() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="font-semibold text-sm uppercase tracking-wide text-white whitespace-nowrap">
            {item}
          </span>
          <span className="mx-4 font-bold" style={{ color: PINK }} aria-hidden="true">•</span>
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden py-4" style={{ background: '#3D3D3D' }}>
      {/* Duplicate items side-by-side so -50% translateX loops seamlessly */}
      <div className="animate-marquee flex w-max">
        <TickerItems />
        <TickerItems />
      </div>
    </div>
  )
}
