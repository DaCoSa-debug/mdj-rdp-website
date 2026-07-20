import { Phone, Mail, MapPin } from 'lucide-react'
import logoWhite from '../assets/mdj-logo-white.png'

const ORANGE = '#FBB040'

// Lucide v1.25 removed brand icons — using minimal inline SVGs
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function IconYoutube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  )
}

const socialIcons = [IconFacebook, IconInstagram, IconYoutube]

const navLinks = [
  'Accueil',
  'Qui sommes-nous',
  'Activités',
  'Événements',
  'Actualités',
  'Galerie',
]

const contactLinks = [
  'Emplois & bénévolat',
  'MDJ Arcade',
  'Transparence',
  'Faire un don',
  'Confidentialité',
  'Loi 25',
]

export default function Footer() {
  return (
    <footer style={{ background: '#3D3D3D' }} className="text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* COL 1 — Brand */}
          <div>
            <img
              src={logoWhite}
              alt="MDJ-RDP"
              className="h-16 w-auto"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              Un espace sûr, gratuit et bienveillant pour les jeunes de
              Rivière-des-Prairies depuis 1982.
            </p>
            <div className="flex gap-3 mt-6">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-4">Infolettre</h3>
            <p className="text-white/60 text-sm mb-4">Reçois nos nouvelles chaque mois.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Ton courriel"
                className="w-full rounded-full px-4 py-3 text-sm text-white outline-none"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.20)',
                }}
              />
              <button
                type="submit"
                className="mt-2 w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE }}
              >
                S'abonner
              </button>
            </form>
          </div>

          {/* COL 3 — Navigation */}
          <div>
            <h3 className="font-bold text-white mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-white/60 text-sm transition-colors hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* COL 4 — Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Nous joindre</h3>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <a href="tel:5140000000" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} strokeWidth={2} />
                (514) 000-0000
              </a>
              <a href="mailto:info@mdjrdp.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} strokeWidth={2} />
                info@mdjrdp.com
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={2} className="shrink-0" />
                Rivière-des-Prairies, Montréal
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              {contactLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-white/60 text-sm transition-colors hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <span>© 2025 Maison des jeunes de Rivière-des-Prairies. Tous droits réservés.</span>
          <span>Conçu avec ♥ pour les jeunes de RDP</span>
        </div>

      </div>
    </footer>
  )
}
