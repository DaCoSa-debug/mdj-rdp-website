import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PINK   = '#F05063'
const ORANGE = '#FBB040'
const BLUE   = '#00AEEF'

const infoCards = [
  {
    Icon:    Phone,
    color:   PINK,
    title:   'Téléphone',
    detail:  '(514) 000-0000',
    sub:     'Lun–Ven, 9h–17h',
  },
  {
    Icon:    Mail,
    color:   ORANGE,
    title:   'Courriel',
    detail:  'info@mdjrdp.com',
    sub:     'Réponse sous 48h',
  },
  {
    Icon:    MapPin,
    color:   BLUE,
    title:   'Adresse',
    detail:  'Rivière-des-Prairies, Montréal',
    sub:     'Québec, Canada',
  },
]

const selectStyle = "w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 bg-white focus:outline-none focus:border-[#F05063] text-sm"

export default function Contact() {
  return (
    <>
      <Header />
      <main>

        {/* ── SECTION 1 — HERO ── */}
        <section
          className="py-20 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(240,80,99,0.08), rgba(0,174,239,0.08))' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: PINK }}>
              NOUS JOINDRE
            </p>
            <h1 className="mt-2 font-black text-4xl md:text-6xl text-gray-900">
              On est là pour toi.
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
              Une question? Une inscription? Écris-nous ou viens nous voir directement à la MDJ-RDP.
            </p>
          </div>
        </section>

        {/* ── SECTION 2 — CONTACT GRID ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* LEFT — Form */}
              <div className="bg-gray-50 rounded-[2rem] p-10">
                <h3 className="font-bold text-2xl text-gray-900 mb-8">
                  Envoie-nous un message
                </h3>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Ton prénom et nom"
                    className={selectStyle}
                  />
                  <input
                    type="email"
                    placeholder="Ton adresse courriel"
                    className={selectStyle}
                  />
                  <input
                    type="tel"
                    placeholder="Ton numéro de téléphone (optionnel)"
                    className={selectStyle}
                  />
                  <select className={selectStyle}>
                    <option value="">Sujet de ton message</option>
                    <option value="inscription">Inscription à une activité</option>
                    <option value="general">Question générale</option>
                    <option value="benevolat">Bénévolat</option>
                    <option value="ciec">CIEC</option>
                    <option value="autre">Autre</option>
                  </select>
                  <textarea
                    rows={5}
                    placeholder="Ton message"
                    className={selectStyle}
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full py-4 font-bold text-lg text-white transition-opacity hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}
                  >
                    Envoyer le message
                  </button>
                </form>
                <p className="mt-4 text-xs text-gray-400 text-center">
                  Nous répondons dans les 24-48 heures ouvrables.
                </p>
              </div>

              {/* RIGHT — Info */}
              <div className="flex flex-col gap-6">
                {infoCards.map(({ Icon, color, title, detail, sub }) => (
                  <div key={title} className="bg-gray-50 rounded-2xl p-6 flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}1A` }}
                    >
                      <Icon size={20} strokeWidth={2} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-gray-600 text-sm mt-0.5">{detail}</p>
                      <p className="text-gray-400 text-sm">{sub}</p>
                    </div>
                  </div>
                ))}

                {/* WhatsApp block */}
                <div className="rounded-2xl p-6 flex items-center gap-4" style={{ background: 'rgba(37,211,102,0.10)' }}>
                  <MessageCircle size={32} strokeWidth={2} style={{ color: '#25D366' }} className="shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">WhatsApp</p>
                    <p className="text-gray-500 text-sm">Écris-nous directement!</p>
                    <a
                      href="https://wa.me/15140000000"
                      className="text-sm font-semibold mt-1 inline-block hover:opacity-70 transition-opacity"
                      style={{ color: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ouvrir WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
