const PRODUCTION_DOMAIN = 'https://mdj-rdp-website.vercel.app'

const OG_IMAGE = '/images/home/mdj-rdp-jeunes-maison-hero.webp'

export interface PageMetadata {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  robots?: string
}

const metadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Maison des jeunes de Rivière-des-Prairies — MDJ RDP',
    description:
      'La Maison des jeunes de Rivière-des-Prairies accompagne les jeunes de 12 à 17 ans à Montréal avec des activités gratuites, du CIEC et des événements communautaires.',
    ogImage: OG_IMAGE,
  },
  '/activites': {
    title: 'Activités MDJ RDP — Sport, Art & Entrepreneuriat',
    description:
      'Découvrez les activités gratuites de la Maison des jeunes de Rivière-des-Prairies : sport, arts, entrepreneuriat et plus encore pour les jeunes de RDP.',
    ogImage: OG_IMAGE,
  },
  '/qui-sommes-nous': {
    title: 'Qui sommes-nous ? — Maison des jeunes de Rivière-des-Prairies',
    description:
      'La MDJ RDP, c’est un organisme communautaire à but non lucratif qui offre un espace sûr, gratuit et bienveillant aux jeunes de Rivière-des-Prairies à Montréal.',
    ogImage: OG_IMAGE,
  },
  '/ciec': {
    title: 'CIEC — Entrepreneuriat jeunesse MDJ RDP',
    description:
      'Le programme CIEC de la Maison des jeunes de Rivière-des-Prairies permet aux jeunes de développer leur projet entrepreneurial avant même le cégep.',
    ogImage: OG_IMAGE,
  },
  '/galerie': {
    title: 'Galerie photo — Moments à la MDJ RDP',
    description:
      "Revivez les meilleurs moments de la Maison des jeunes de Rivière-des-Prairies : activités, événements et découvertes des jeunes.",
    ogImage: OG_IMAGE,
  },
  '/evenements': {
    title: 'Événements MDJ RDP — Calendrier et inscriptions',
    description:
      "Consultez les prochains événements de la Maison des jeunes de Rivière-des-Prairies : tournois, soirées cinéma, ateliers et sorties à Montréal.",
    ogImage: OG_IMAGE,
  },
  '/contact': {
    title: 'Contactez la Maison des jeunes de Rivière-des-Prairies',
    description:
        "Écrivez à la MDJ RDP pour participer aux activités, poser une question ou rejoindre la communauté des jeunes de Rivière-des-Prairies à Montréal.",
    ogImage: OG_IMAGE,
  },
  '/don': {
    title: 'Faire un don — Soutenez la MDJ RDP',
    description:
      "Votre don permet à la Maison des jeunes de Rivière-des-Prairies de continuer à offrir des activités gratuites aux jeunes de 12 à 17 ans.",
    ogImage: OG_IMAGE,
  },
  '/arcade': {
    title: 'MDJ Arcade — Jeux gratuits pour les jeunes de RDP',
    description:
      "Découvrez l'arcade gratuit de la Maison des jeunes de Rivière-des-Prairies : quiz, Triki, Snake, RDP Run et plus encore, spécialement conçus pour les jeunes.",
    ogImage: '/images/arcade/mdj-arcade-hero.png',
  },
  '/arcade/tv': {
    title: 'MDJ Arcade TV — Salle de jeu',
    description: 'Salle TV MDJ Arcade.',
    robots: 'noindex, nofollow',
  },
  '/arcade/join/:roomCode': {
    title: 'Rejoindre une salle MDJ Arcade',
    description: 'Rejoindre une salle MDJ Arcade.',
    robots: 'noindex, nofollow',
  },
}

export function getPageMetadata(path: string): PageMetadata {
  return metadata[path] || {
    title: 'MDJ RDP — Maison des jeunes de Rivière-des-Prairies',
    description: 'La Maison des jeunes de Rivière-des-Prairies accompagne les jeunes de 12 à 17 ans à Montréal.',
    ogImage: OG_IMAGE,
  }
}

export { PRODUCTION_DOMAIN }
