# MDJ-RDP Website — Project Skill

## Stack
- React + Vite + TypeScript + Tailwind CSS
- React Router v6
- lucide-react for icons
- Node v22.13.0 / npm 10.9.2
- Deploy: Vercel (manual: vercel --prod)
- Repo: https://github.com/DaCoSa-debug/mdj-rdp-website.git

## Workflow (MANDATORY)
- All prompts from Claude chat go in English inside copyable code blocks
- Every prompt ends with: "Report what changed. Do not commit - I commit manually."
- Pattern: VERIFY → REPORT → FIX
- Git commands always separate (never use &&)

## Brand Colors (OFFICIAL)
- Pink:   #F05063
- Orange: #F7941E
- Yellow: #FBB040
- Green:  #8DC63F
- Blue:   #29ABE2
- Dark:   #231F20

## Gradients
- Warm CTA:   linear-gradient(135deg, #F7941E, #F05063)
- Brand:      linear-gradient(135deg, #FBB040, #F05063, #29ABE2)
- CIEC:       linear-gradient(135deg, #F05063, #29ABE2)

## Typography
- Font: Inter (Google Fonts)
- Headings: font-black (900)
- Labels: font-semibold uppercase tracking-wide text-sm
- Section padding: py-20 md:py-28
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

## Project Structure
src/
  components/  — 13 reusable components (Header, Hero, Marquee, About, Programs,
                  CIEC, Events, Testimonials, Arcade, Donation, Newsletter,
                  Footer, WhatsAppButton, QuizGame)
  pages/       — 11 pages (Home, QuiSommesNous, Activites, Evenements, Actualites,
                  Galerie, CIEC, EspaceParents, Emplois, Arcade, Contact)
  assets/      — mdj-logo.png, mdj-logo-white.png (hero-youth.jpg PENDING)
  styles/      — globals.css (keyframes: float-slow, marquee, fade-up)

## Routes
/                → Home
/qui-sommes-nous → QuiSommesNous
/activites       → Activites
/evenements      → Evenements
/actualites      → Actualites
/galerie         → Galerie
/ciec            → CIEC page
/espace-parents  → EspaceParents
/emplois         → Emplois
/arcade          → Arcade (QuizGame full-screen)
/contact         → Contact

## QuizGame Specs
- File: src/components/QuizGame.tsx
- 80 questions / 8 categories / 10 per category
- Timer: 20 seconds per question
- Score: 100 base + speed bonus (max 200 per question)
- Storage: localStorage keys: mdj-quiz-scores, mdj_quiz_player_name
- Desktop: max-w-md centered shell
- Mobile: full-width
- States: home → playing → result → leaderboard

## Pending Assets
- src/assets/hero-youth.jpg     (lost in vite overwrite — needs re-upload)
- src/assets/activity-sport.jpg (lost in vite overwrite — needs re-upload)

## Inline Styles Rule
Use inline styles ONLY when Tailwind cannot handle dynamic runtime values:
- Dynamic category colors: style={{ color: category.color }}
- Gradients with specific hex: style={{ background: 'linear-gradient(...)' }}
- WebKit gradient text: style={{ WebkitBackgroundClip: 'text', ... }}
Never use inline styles for static values Tailwind can handle.
