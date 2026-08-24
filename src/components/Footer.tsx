import { Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoWhite from '../assets/mdj-logo-white.png'

const ORANGE = '#FBB040'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Qui sommes-nous', to: '/qui-sommes-nous' },
  { label: 'Activités', to: '/activites' },
  { label: 'Événements', to: '/evenements' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Galerie', to: '/galerie' },
]

const contactLinks = [
  { label: 'Emplois & bénévolat', to: '/emplois' },
  { label: 'MDJ Arcade', to: '/arcade' },
  { label: 'Faire un don', to: '/don' },
  { label: 'Nous joindre', to: '/contact' },
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
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/lamaisondesjeunesRDP" target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center rounded-full border border-white/15 px-4 text-sm font-bold text-white/75 transition-colors hover:border-white/40 hover:text-white" aria-label="Facebook de la Maison des jeunes RDP">
                f&nbsp; Facebook
              </a>
              <a href="https://www.instagram.com/mdj.rdp/" target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center rounded-full border border-white/15 px-4 text-sm font-bold text-white/75 transition-colors hover:border-white/40 hover:text-white" aria-label="Instagram de la Maison des jeunes RDP">
                ◎&nbsp; Instagram
              </a>
            </div>
          </div>

          {/* COL 2 — Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-4">Infolettre</h3>
            <p className="text-white/60 text-sm mb-4">Reçois nos nouvelles chaque mois.</p>
            <form>
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
                type="button"
                disabled
                className="mt-2 w-full cursor-not-allowed rounded-full px-6 py-3 text-sm font-semibold text-white opacity-60"
                style={{ background: ORANGE }}
              >
                Infolettre bientôt disponible
              </button>
            </form>
          </div>

          {/* COL 3 — Navigation */}
          <div>
            <h3 className="font-bold text-white mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white/60 text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* COL 4 — Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Nous joindre</h3>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <Link to="/contact" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} strokeWidth={2} />Voir les coordonnées</Link>
              <Link to="/contact" className="inline-flex items-center gap-2 hover:text-white transition-colors"><Mail size={14} strokeWidth={2} />Écrire à la MDJ</Link>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={2} className="shrink-0" />
                Rivière-des-Prairies, Montréal
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              {contactLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white/60 text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
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
