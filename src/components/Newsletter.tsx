import { Mail } from 'lucide-react'

const PINK   = '#F05063'
const ORANGE = '#FBB040'

export default function Newsletter() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 text-center">

          {/* Label */}
          <div
            className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wide"
            style={{ color: PINK }}
          >
            <Mail size={16} strokeWidth={2.5} />
            Infolettre
          </div>

          {/* Heading */}
          <h2 className="mt-2 font-black text-3xl text-gray-900">
            Reste dans la boucle!
          </h2>

          {/* Body */}
          <p className="mt-4 text-gray-500 leading-relaxed">
            Reçois les dernières nouvelles, événements et activités de la MDJ-RDP
            directement dans ta boîte courriel.
          </p>

          {/* Form */}
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Ton adresse courriel"
              className="flex-1 rounded-full border border-gray-200 px-6 py-4 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#F05063]"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, ${PINK} 100%)` }}
            >
              Je m'abonne
            </button>
          </form>

          {/* Fine print */}
          <p className="mt-4 text-xs text-gray-400">
            Pas de spam. Désabonnement facile à tout moment.
          </p>

        </div>
      </div>
    </section>
  )
}
