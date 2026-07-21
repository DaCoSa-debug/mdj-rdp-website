const PINK   = '#F05063'
const ORANGE = '#FBB040'

const stats = [
  { value: '12',   label: 'semaines de programme' },
  { value: '8-12', label: 'jeunes par cohorte' },
  { value: '100%', label: 'gratuit pour toi' },
  { value: '30+',  label: 'mentors bénévoles' },
]

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
              LE PROGRAMME CIEC
            </p>
            <h2 className="mt-2 font-black text-4xl md:text-6xl text-white leading-tight">
              CIEC : deviens<br />
              entrepreneur·e<br />
              avant même le<br />
              <span style={{ color: ORANGE }}>CÉGEP.</span>
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Chaque année, la MDJ-RDP accompagne des jeunes entrepreneurs. Ils apprennent à créer leur entreprise, à développer leurs idées et à partager leurs projets.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold transition-opacity hover:opacity-90"
                style={{ color: PINK }}
              >
                En savoir plus
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-full border-2 border-white bg-transparent px-8 py-4 font-bold text-white transition-opacity hover:opacity-80"
              >
                Postuler à l'édition 2026
              </a>
            </div>
          </div>

          {/* RIGHT — stats card */}
          <div
            className="rounded-[2.5rem] p-8 border border-white/20"
            style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}
          >
            <h3 className="font-bold text-white text-xl mb-6">
              Le programme en chiffres
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={value}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'rgba(255,255,255,0.10)' }}
                >
                  <div className="font-black text-5xl text-white">{value}</div>
                  <div className="text-white/70 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
