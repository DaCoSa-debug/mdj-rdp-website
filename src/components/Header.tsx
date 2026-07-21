import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, Moon, Heart } from 'lucide-react'
import logo from '../assets/mdj-logo.png'

const PINK = '#F05063'

const navLinks = [
  { label: 'Accueil',        to: '/' },
  { label: 'Qui sommes-nous', to: '/qui-sommes-nous' },
  { label: 'Activités',      to: '/activites' },
  { label: 'Événements',     to: '/evenements' },
  { label: 'Actualités',     to: '/actualites' },
  { label: 'Galerie',        to: '/galerie' },
  { label: 'CIEC',           to: '/ciec' },
  { label: 'Parents',        to: '/espace-parents' },
]

const secondaryLinks = [
  { label: 'CIEC',    to: '/ciec' },
  { label: 'Parents', to: '/espace-parents' },
  { label: 'Emplois', to: '/emplois' },
  { label: 'Arcade',  to: '/arcade' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const primaryClass = (to: string) =>
    `px-3 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
      pathname === to
        ? 'font-semibold'
        : 'text-[#3D3D3D] hover:text-[#F05063]'
    }`

  const secondaryClass = (to: string) =>
    `px-3 py-2.5 text-xs font-medium transition-colors whitespace-nowrap ${
      pathname === to
        ? 'font-semibold'
        : 'text-gray-500 hover:text-[#F05063]'
    }`

  const mobileClass = (to: string, isPrimary: boolean) =>
    `px-2 text-sm font-medium transition-colors ${
      isPrimary
        ? `py-3 border-b border-gray-100 last:border-0 ${pathname === to ? 'font-semibold' : 'text-[#3D3D3D] hover:text-[#F05063]'}`
        : `py-2.5 text-xs ${pathname === to ? 'font-semibold' : 'text-gray-500 hover:text-[#F05063]'}`
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      {/* Main bar — 3-column grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20">

          {/* LEFT — hamburger (mobile only) */}
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#3D3D3D] hover:bg-gray-100 transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* CENTER — logo */}
          <Link to="/" aria-label="Maison des jeunes de Rivière-des-Prairies — Accueil">
            <img
              src={logo}
              alt="Maison des jeunes de Rivière-des-Prairies"
              className="h-11 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* RIGHT — search, dark mode, donation */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Rechercher"
              className="inline-flex items-center justify-center rounded-lg p-2 text-[#3D3D3D] hover:bg-gray-100 transition-colors"
            >
              <Search size={20} />
            </button>

            <button
              type="button"
              aria-label="Passer en mode sombre"
              className="inline-flex items-center justify-center rounded-lg p-2 text-[#3D3D3D] hover:bg-gray-100 transition-colors"
            >
              <Moon size={20} />
            </button>

            <a
              href="/don"
              aria-label="Faire un don"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #FBB040 0%, #F05063 100%)' }}
            >
              <Heart size={14} strokeWidth={2.5} />
              Faire un don
            </a>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV — primary links */}
      <div className="hidden lg:block border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Primary nav */}
            <nav className="flex items-center gap-1" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={primaryClass(link.to)}
                  style={pathname === link.to ? { color: PINK } : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Secondary nav */}
            <nav className="flex items-center gap-1" aria-label="Navigation secondaire">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={secondaryClass(link.to)}
                  style={pathname === link.to ? { color: PINK } : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={mobileClass(link.to, true)}
                style={pathname === link.to ? { color: PINK } : undefined}
              >
                {link.label}
              </Link>
            ))}
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={mobileClass(link.to, false)}
                style={pathname === link.to ? { color: PINK } : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/don"
              className="mt-3 mb-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #FBB040 0%, #F05063 100%)' }}
            >
              <Heart size={14} strokeWidth={2.5} />
              Faire un don
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
