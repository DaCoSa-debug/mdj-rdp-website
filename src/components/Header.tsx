import { useState } from 'react'
import { Menu, Search, Moon, Heart } from 'lucide-react'
import logo from '../assets/mdj-logo.png'

const navLinks = [
  { label: 'Accueil', href: '#' },
  { label: 'Qui sommes-nous', href: '#' },
  { label: 'Activités', href: '#' },
  { label: 'Événements', href: '#events' },
  { label: 'Actualités', href: '#' },
  { label: 'Galerie', href: '#' },
  { label: 'CIEC', href: '#' },
  { label: 'Parents', href: '#' },
]

const secondaryLinks = [
  { label: 'CIEC', href: '#' },
  { label: 'Parents', href: '#' },
  { label: 'Emplois', href: '#' },
  { label: 'Arcade', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <a href="#" aria-label="Maison des jeunes de Rivière-des-Prairies — Accueil">
            <img
              src={logo}
              alt="Maison des jeunes de Rivière-des-Prairies"
              className="h-11 md:h-20 w-auto object-contain"
            />
          </a>

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
              href="#"
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
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-3 text-sm font-medium text-[#3D3D3D] hover:text-[#F05063] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Secondary nav */}
            <nav className="flex items-center gap-1" aria-label="Navigation secondaire">
              {secondaryLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2.5 text-xs font-medium text-gray-500 hover:text-[#F05063] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* MOBILE MENU — shown when hamburger is toggled */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-3 text-sm font-medium text-[#3D3D3D] hover:text-[#F05063] border-b border-gray-100 last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2.5 text-xs font-medium text-gray-500 hover:text-[#F05063] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
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
