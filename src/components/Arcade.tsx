import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Users } from 'lucide-react'

const ORANGE = '#FBB040'
const PINK = '#F05063'
const BLUE = '#29ABE2'

const games = [
  { emoji: '🏃', title: 'RDP Run', tag: 'Course & réflexes', color: BLUE },
  { emoji: '🧠', title: 'Quiz MDJ', tag: '130 questions · 13 thèmes', color: ORANGE },
  { emoji: '⭕❌', title: 'Triki MDJ', tag: 'Défie l’IA ou tes amis', color: PINK },
  { emoji: '🐍', title: 'Snake MDJ', tag: 'Le rétro revient', color: '#8DC63F' },
  { emoji: '🧩', title: 'RDP Blocs', tag: 'Complète les lignes', color: ORANGE },
]

export default function Arcade() {
  return (
    <section className="overflow-hidden py-20" style={{ background: '#231F20' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/45">MDJ ARCADE</p>
            <h2 className="mt-2 text-4xl font-black leading-tight text-white md:text-5xl">
              Joue. Apprends.<br />
              <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK}, ${BLUE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Relève le défi.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-white/60">
              Cinq jeux gratuits conçus pour mobile: records, quiz, défis entre amis et plaisir garanti.
            </p>

            <div className="mt-7 grid max-w-lg grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"><p className="text-xl font-black text-white">5</p><p className="text-[10px] font-bold uppercase tracking-wide text-white/45">jeux</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"><p className="text-xl font-black" style={{ color: ORANGE }}>130</p><p className="text-[10px] font-bold uppercase tracking-wide text-white/45">questions</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"><p className="text-xl font-black" style={{ color: PINK }}>13</p><p className="text-[10px] font-bold uppercase tracking-wide text-white/45">thèmes</p></div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/arcade" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 font-bold text-white transition-opacity hover:opacity-90" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}>
                Entrer dans l’arcade <ArrowRight size={18} />
              </Link>
              <span className="inline-flex items-center justify-center gap-2 px-3 text-sm font-semibold text-white/60"><Users size={17} style={{ color: BLUE }} /> Partage tes défis</span>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute -inset-12 rounded-full blur-3xl" style={{ background: `${BLUE}18` }} />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#2a2020] p-4 shadow-2xl sm:p-6">
              <div className="mb-4 flex items-center justify-between px-1">
                <p className="text-xs font-black uppercase tracking-[.18em] text-white/45">Choisis ton défi</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: ORANGE }}><Trophy size={15} /> Classements</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {games.map((game, index) => (
                  <div key={game.title} className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${index === 0 ? 'sm:col-span-2' : ''}`}>
                    <span className="animate-arcade-icon inline-flex text-3xl" style={{ animationDelay: `${index * 120}ms` }}>{game.emoji}</span>
                    <p className="mt-3 font-black text-white">{game.title}</p>
                    <p className="mt-1 text-xs text-white/45">{game.tag}</p>
                    <span className="mt-3 block h-1.5 rounded-full" style={{ background: game.color }} />
                  </div>
                ))}
              </div>
              <Link to="/arcade" className="mt-4 flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 text-sm font-bold text-white transition-colors hover:bg-white/10">Jouer maintenant</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
