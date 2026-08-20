import { useState, useEffect } from 'react'
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react'
import ShareScore from './ShareScore'
import { addXp, getGameTopRanking, getSessionName, recordGameScore } from '../lib/arcadeScores'
import type { GameRank } from '../lib/arcadeScores'

/* ── Brand palette ─────────────────────────────────────────────── */
const BRAND = {
  pink:   '#F05063',
  orange: '#F7941E',
  yellow: '#FBB040',
  green:  '#8DC63F',
  blue:   '#29ABE2',
  dark:   '#231F20',
}

/* ── Category definitions ───────────────────────────────────────── */
const categories = [
  { id: 'rdp',            label: 'Mon quartier RDP',         emoji: '🏙️', color: BRAND.pink   },
  { id: 'mdj',            label: 'La MDJ-RDP',               emoji: '🏠', color: BRAND.yellow },
  { id: 'culture',        label: 'Culture québécoise',        emoji: '🎨', color: BRAND.orange },
  { id: 'sport',          label: 'Sport & Athlètes',          emoji: '🏀', color: BRAND.blue   },
  { id: 'entrepreneuriat',label: 'Entrepreneuriat',           emoji: '💼', color: BRAND.green  },
  { id: 'sante',          label: 'Santé & Bien-être',         emoji: '🧠', color: BRAND.pink   },
  { id: 'prevention',     label: 'Prévention & Droits',       emoji: '🛡️', color: BRAND.blue   },
  { id: 'enjeux',         label: 'Enjeux & Environnement',    emoji: '🌍', color: BRAND.green  },
  { id: 'cinema',         label: 'Cinéma & Séries',           emoji: '🎬', color: BRAND.pink   },
  { id: 'gaming',         label: 'Jeux vidéo',                emoji: '🎮', color: BRAND.blue   },
  { id: 'musique',        label: 'Musique & culture',         emoji: '🎵', color: BRAND.orange },
  { id: 'web',            label: 'Internet & Aura',           emoji: '✨', color: BRAND.yellow },
  { id: 'actu',           label: 'Actu & médias',             emoji: '🗞️', color: BRAND.green  },
] as const

type CategoryId = typeof categories[number]['id']

/* ── Questions bank ─────────────────────────────────────────────── */
interface Question {
  question: string
  options: string[]
  correct: number
  category: CategoryId
}

const ALL_QUESTIONS: Question[] = [
  /* ── RDP ── */
  {
    category: 'rdp',
    question: 'Dans quel arrondissement de Montréal se trouve Rivière-des-Prairies?',
    options: ['Mercier–Hochelaga-Maisonneuve', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Saint-Laurent', 'Montréal-Nord'],
    correct: 1,
  },
  {
    category: 'rdp',
    question: 'Quelle rivière longe le quartier de Rivière-des-Prairies au nord?',
    options: ['Le fleuve Saint-Laurent', 'La rivière des Prairies', 'La rivière Richelieu', 'La rivière des Outaouais'],
    correct: 1,
  },
  {
    category: 'rdp',
    question: 'Comment appelle-t-on familièrement les habitants de Rivière-des-Prairies?',
    options: ['Les Prairiens', 'Les Rivièrains', 'Les Prairiois', 'Les Rivièrois'],
    correct: 0,
  },
  {
    category: 'rdp',
    question: 'Quel est le surnom populaire de Rivière-des-Prairies?',
    options: ['RDP', 'La Prairie', 'Le Plateau', 'L\'Est'],
    correct: 0,
  },
  {
    category: 'rdp',
    question: 'Quel pont relie principalement RDP à Laval?',
    options: ['Pont Jacques-Cartier', 'Pont Pie-IX', 'Pont Louis-Bisson', 'Pont Viau'],
    correct: 3,
  },
  {
    category: 'rdp',
    question: 'RDP est situé dans quelle partie de l\'île de Montréal?',
    options: ['Ouest', 'Centre', 'Est', 'Nord-Est'],
    correct: 3,
  },
  /* ── MDJ ── */
  {
    category: 'mdj',
    question: 'Que signifie l\'acronyme "MDJ"?',
    options: ['Maison Des Jeunes', 'Mission Du Jeune', 'Mouvement Des Jeux', 'Maison Du Jeu'],
    correct: 0,
  },
  {
    category: 'mdj',
    question: 'La MDJ-RDP offre des services principalement pour quelle tranche d\'âge?',
    options: ['6 à 12 ans', '12 à 17 ans', '12 à 24 ans', '18 à 30 ans'],
    correct: 2,
  },
  {
    category: 'mdj',
    question: 'Quelle est la mission principale d\'une maison des jeunes?',
    options: ['Offrir des cours scolaires', 'Favoriser le développement des jeunes', 'Gérer un centre sportif', 'Offrir des soins médicaux'],
    correct: 1,
  },
  {
    category: 'mdj',
    question: 'La MDJ-RDP est un organisme de quel type?',
    options: ['Gouvernemental', 'Privé à but lucratif', 'Communautaire à but non lucratif', 'Scolaire'],
    correct: 2,
  },
  {
    category: 'mdj',
    question: 'Quel programme de la MDJ-RDP aide les jeunes à développer des projets d\'affaires?',
    options: ['CIEC', 'Sport-Études', 'Jeunes en action', 'Cap Jeunesse'],
    correct: 0,
  },
  {
    category: 'mdj',
    question: 'Que signifie CIEC dans le contexte MDJ?',
    options: ['Centre d\'Intégration et d\'Emploi Communautaire', 'Carrefour d\'Innovation et d\'Entrepreneuriat des Citoyens', 'Centre d\'Initiatives des Entrepreneurs et Communautés', 'Club d\'Investissement Entrepreneurial Communautaire'],
    correct: 1,
  },
  /* ── Culture québécoise ── */
  {
    category: 'culture',
    question: 'Quelle langue est principalement parlée à la MDJ-RDP?',
    options: ['Anglais', 'Espagnol', 'Français', 'Créole'],
    correct: 2,
  },
  {
    category: 'culture',
    question: 'Quelle fête nationale célébrée le 24 juin est propre au Québec?',
    options: ['La fête du Canada', 'La Saint-Jean-Baptiste', 'La fête de la Reine', 'La fête du Travail'],
    correct: 1,
  },
  {
    category: 'culture',
    question: 'Quel sport est l\'emblème de la culture québécoise?',
    options: ['Le soccer', 'Le basketball', 'Le hockey sur glace', 'Le baseball'],
    correct: 2,
  },
  {
    category: 'culture',
    question: 'Quel célèbre festival de musique a lieu chaque été à Montréal?',
    options: ['Osheaga', 'Le Festival de Jazz de Montréal', 'Lollapalooza', 'Coachella'],
    correct: 1,
  },
  {
    category: 'culture',
    question: 'Quel est le plat typique québécois fait de frites, fromage en grains et sauce?',
    options: ['La galvaude', 'Le pâté chinois', 'La poutine', 'Le cipâte'],
    correct: 2,
  },
  {
    category: 'culture',
    question: 'Comment s\'appelle le célèbre carnaval d\'hiver du Québec?',
    options: ['Le Carnaval de Montréal', 'Le Carnaval de Québec', 'La Fête des Neiges', 'L\'Igloofest'],
    correct: 1,
  },
  /* ── Sport ── */
  {
    category: 'sport',
    question: 'Quel sport est le plus populaire dans les rues de RDP?',
    options: ['Le soccer', 'Le basketball', 'Le hockey', 'Le baseball'],
    correct: 2,
  },
  {
    category: 'sport',
    question: 'Quelle équipe de hockey représente Montréal dans la LNH?',
    options: ['Les Sénateurs', 'Les Maple Leafs', 'Les Canadiens', 'Les Nordiques'],
    correct: 2,
  },
  {
    category: 'sport',
    question: 'Quel athlète québécois a remporté plusieurs titres mondiaux en haltérophilie?',
    options: ['Simon Dumont', 'Christine Girard', 'Bruny Surin', 'Mikaël Kingsbury'],
    correct: 1,
  },
  {
    category: 'sport',
    question: 'Quel Québécois est champion du monde de ski acrobatique (bosses)?',
    options: ['Jean-Luc Brassard', 'Mikaël Kingsbury', 'Erik Guay', 'Manuel Osborne-Paradis'],
    correct: 1,
  },
  {
    category: 'sport',
    question: 'Dans quel sport excelle Penny Oleksiak, originaire de Montréal?',
    options: ['Athlétisme', 'Natation', 'Cyclisme', 'Patinage artistique'],
    correct: 1,
  },
  {
    category: 'sport',
    question: 'Combien de buts Wayne Gretzky a-t-il marqués en carrière en LNH?',
    options: ['594', '700', '894', '1000'],
    correct: 2,
  },
  /* ── Entrepreneuriat ── */
  {
    category: 'entrepreneuriat',
    question: 'Qu\'est-ce qu\'un plan d\'affaires?',
    options: ['Un calendrier de vacances', 'Un document décrivant les objectifs et la stratégie d\'une entreprise', 'Un contrat de travail', 'Un bilan comptable'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Que signifie le terme "startup"?',
    options: ['Une grande entreprise établie', 'Une jeune entreprise innovante à fort potentiel de croissance', 'Un programme gouvernemental', 'Un type de franchise'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Qu\'est-ce que le financement participatif (crowdfunding)?',
    options: ['Un prêt bancaire', 'Un programme gouvernemental', 'Collecter des fonds auprès d\'un grand nombre de personnes via internet', 'Une subvention provinciale'],
    correct: 2,
  },
  {
    category: 'entrepreneuriat',
    question: 'Quel est l\'objectif du programme Défi OSEntreprendre?',
    options: ['Former des comptables', 'Reconnaître et soutenir les projets entrepreneuriaux', 'Financer uniquement les grandes entreprises', 'Offrir des stages en Europe'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Qu\'est-ce qu\'une coopérative?',
    options: ['Une entreprise détenue par un seul actionnaire', 'Une association détenue et gérée par ses membres', 'Un organisme gouvernemental', 'Une multinationale'],
    correct: 1,
  },
  {
    category: 'entrepreneuriat',
    question: 'Le réseautage en affaires sert principalement à quoi?',
    options: ['Configurer des ordinateurs', 'Créer des connexions professionnelles et des opportunités', 'Gérer les finances', 'Recruter des employés uniquement'],
    correct: 1,
  },
  /* ── Santé & Bien-être ── */
  {
    category: 'sante',
    question: 'Combien d\'heures de sommeil sont recommandées pour un adolescent (14-17 ans)?',
    options: ['6 à 7 heures', '7 à 8 heures', '8 à 10 heures', '10 à 12 heures'],
    correct: 2,
  },
  {
    category: 'sante',
    question: 'Quelle pratique aide le plus à réduire le stress selon les experts?',
    options: ['Regarder les réseaux sociaux', 'L\'activité physique régulière', 'Dormir davantage seulement', 'Éviter tout effort'],
    correct: 1,
  },
  {
    category: 'sante',
    question: 'Combien de portions de fruits et légumes est-il recommandé de manger par jour?',
    options: ['2 portions', '4 portions', '7 à 10 portions', '12 portions'],
    correct: 2,
  },
  {
    category: 'sante',
    question: 'Qu\'est-ce que la santé mentale?',
    options: ['L\'absence de maladie physique', 'Le bien-être émotionnel, psychologique et social', 'Un résultat scolaire élevé', 'La capacité à faire du sport'],
    correct: 1,
  },
  {
    category: 'sante',
    question: 'Quel organisme québécois offre une ligne d\'écoute pour les jeunes en détresse?',
    options: ['Santé Canada', 'Tel-jeunes', 'CLSC', 'RAMQ'],
    correct: 1,
  },
  {
    category: 'sante',
    question: 'Quelle est la quantité d\'eau recommandée à boire par jour?',
    options: ['500 ml', '1 litre', '1,5 à 2 litres', '3 à 4 litres'],
    correct: 2,
  },
  /* ── Prévention & Droits ── */
  {
    category: 'prevention',
    question: 'À partir de quel âge peut-on voter aux élections fédérales au Canada?',
    options: ['16 ans', '17 ans', '18 ans', '21 ans'],
    correct: 2,
  },
  {
    category: 'prevention',
    question: 'Qu\'est-ce que le harcèlement scolaire (intimidation)?',
    options: ['Un jeu entre amis', 'Des comportements agressifs répétés envers une même personne', 'Une dispute ponctuelle', 'Une forme de taquinerie légère'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Quelle loi protège les droits des enfants au Canada?',
    options: ['La Charte canadienne des droits et libertés', 'La Convention des Nations Unies relative aux droits de l\'enfant', 'Le Code civil du Québec', 'La Loi sur l\'instruction publique'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Qu\'est-ce que le consentement éclairé?',
    options: ['Accepter quelque chose sous pression', 'Donner un accord libre, informé et révocable', 'Signer un contrat', 'Obéir à une figure d\'autorité'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Quel organisme peut aider un jeune victime de discrimination au Québec?',
    options: ['La Régie du logement', 'La Commission des droits de la personne et des droits de la jeunesse', 'Hydro-Québec', 'La SAQ'],
    correct: 1,
  },
  {
    category: 'prevention',
    question: 'Que faire si tu es témoin d\'un crime?',
    options: ['Ignorer la situation', 'Appeler le 911 ou le 310-4141', 'Publier une vidéo sur les réseaux sociaux', 'Régler ça soi-même'],
    correct: 1,
  },
  /* ── Enjeux & Environnement ── */
  {
    category: 'enjeux',
    question: 'Que signifie le terme "empreinte carbone"?',
    options: ['La couleur de la fumée des usines', 'La quantité de CO₂ émise par nos activités', 'Un type de combustible', 'L\'empreinte digitale d\'un moteur'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Quel geste quotidien réduit le plus notre impact environnemental?',
    options: ['Éteindre une lumière', 'Réduire la consommation de viande rouge', 'Recycler le papier', 'Utiliser des sacs réutilisables'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Qu\'est-ce que l\'économie circulaire?',
    options: ['Un système économique basé sur la croissance infinie', 'Un modèle qui vise à éliminer les déchets en réutilisant les ressources', 'Un type de marché boursier', 'Un programme de recyclage gouvernemental'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Quelle est la principale source d\'énergie du Québec?',
    options: ['Le pétrole', 'Le nucléaire', 'L\'hydroélectricité', 'Le gaz naturel'],
    correct: 2,
  },
  {
    category: 'enjeux',
    question: 'Que signifie "3RV" en environnement?',
    options: ['Recycler, Récupérer, Revendre', 'Réduire, Réutiliser, Recycler, Valoriser', 'Rénover, Réparer, Revitaliser', 'Réduire, Récupérer, Revendre'],
    correct: 1,
  },
  {
    category: 'enjeux',
    question: 'Quel accord international vise à limiter le réchauffement climatique à 1,5°C?',
    options: ['L\'Accord de Kyoto', 'Le Protocole de Montréal', 'L\'Accord de Paris', 'La Convention de Rio'],
    correct: 2,
  },
  /* ── Cinéma & séries ── */
  { category: 'cinema', question: 'Dans quelle ville se déroule principalement la série Stranger Things?', options: ['Hawkins', 'Riverdale', 'Springfield', 'Stars Hollow'], correct: 0 },
  { category: 'cinema', question: 'Quel studio a créé Toy Story?', options: ['Pixar', 'DreamWorks', 'Ghibli', 'Aardman'], correct: 0 },
  { category: 'cinema', question: 'Comment s’appelle la famille au centre de la série Wednesday?', options: ['Addams', 'Simpson', 'Bridgerton', 'Dutton'], correct: 0 },
  { category: 'cinema', question: 'Dans Spider-Man: Into the Spider-Verse, qui est le nouveau héros?', options: ['Miles Morales', 'Peter Parker', 'Gwen Stacy', 'Miguel O’Hara'], correct: 0 },
  { category: 'cinema', question: 'Quel genre mélange animation japonaise et séries dessinées?', options: ['Anime', 'Sitcom', 'Documentaire', 'Opéra'], correct: 0 },
  { category: 'cinema', question: 'Quel film suit l’aventure de la famille Madrigal?', options: ['Encanto', 'Coco', 'Vaiana', 'Luca'], correct: 0 },
  { category: 'cinema', question: 'Qu’est-ce qu’un spoiler?', options: ['Révéler un élément important de l’histoire', 'Un effet sonore', 'Une bande-annonce', 'Un sous-titre'], correct: 0 },
  { category: 'cinema', question: 'Quelle série suit des joueurs qui doivent survivre à des jeux?', options: ['Squid Game', 'Friends', 'The Office', 'Dark'], correct: 0 },
  { category: 'cinema', question: 'Quel rôle joue généralement un réalisateur?', options: ['Diriger la vision du film', 'Vendre les billets', 'Fabriquer les costumes seul', 'Traduire les sous-titres'], correct: 0 },
  { category: 'cinema', question: 'Quel prix célèbre récompense notamment des films et artistes du cinéma?', options: ['Les Oscars', 'Le Ballon d’Or', 'Le Grammy', 'Le Nobel'], correct: 0 },
  /* ── Jeux vidéo ── */
  { category: 'gaming', question: 'Dans Minecraft, quel matériau sert souvent à fabriquer les premiers outils?', options: ['Le bois', 'Le diamant', 'Le verre', 'La laine'], correct: 0 },
  { category: 'gaming', question: 'Quelle entreprise est associée à Mario et Zelda?', options: ['Nintendo', 'Valve', 'Ubisoft', 'Sega'], correct: 0 },
  { category: 'gaming', question: 'Dans Fortnite, quel est l’objectif principal du mode Battle Royale?', options: ['Être le dernier survivant', 'Finir une course', 'Résoudre un crime', 'Construire une ferme'], correct: 0 },
  { category: 'gaming', question: 'Que signifie “multijoueur”?', options: ['Jouer avec plusieurs personnes', 'Jouer sans écran', 'Jouer seulement hors ligne', 'Jouer une seule fois'], correct: 0 },
  { category: 'gaming', question: 'Quel personnage est la mascotte bleue très rapide de Sega?', options: ['Sonic', 'Kirby', 'Pac-Man', 'Crash'], correct: 0 },
  { category: 'gaming', question: 'Qu’est-ce qu’un jeu indépendant (indie)?', options: ['Un jeu créé hors des grands studios', 'Un jeu sans règles', 'Un jeu uniquement sur téléphone', 'Un jeu gratuit obligatoirement'], correct: 0 },
  { category: 'gaming', question: 'Dans Roblox, que peuvent créer les joueurs?', options: ['Leurs propres expériences', 'Uniquement des photos', 'Des films de cinéma', 'Des consoles'], correct: 0 },
  { category: 'gaming', question: 'À quoi sert une sauvegarde dans un jeu?', options: ['Conserver sa progression', 'Augmenter le volume', 'Supprimer un niveau', 'Changer la langue'], correct: 0 },
  { category: 'gaming', question: 'Quel genre demande de résoudre des énigmes?', options: ['Puzzle', 'Course', 'Combat', 'Sport'], correct: 0 },
  { category: 'gaming', question: 'Que désigne “GG” après une partie?', options: ['Good game', 'Grand gagnant', 'Gros gain', 'Groupe gaming'], correct: 0 },
  /* ── Musique & culture ── */
  { category: 'musique', question: 'Quel élément donne le rythme dans une chanson?', options: ['Le tempo', 'Le générique', 'Le décor', 'Le montage'], correct: 0 },
  { category: 'musique', question: 'Quel instrument possède habituellement six cordes?', options: ['La guitare', 'La trompette', 'La batterie', 'La flûte'], correct: 0 },
  { category: 'musique', question: 'Qu’est-ce qu’un refrain?', options: ['La partie qui revient dans une chanson', 'Le début du clip', 'Le silence final', 'Le titre de l’album'], correct: 0 },
  { category: 'musique', question: 'Quel style musical est né dans la culture hip-hop?', options: ['Le rap', 'Le classique', 'L’opéra', 'Le jazz manouche'], correct: 0 },
  { category: 'musique', question: 'À quoi sert un casque d’écoute?', options: ['Écouter sans déranger autour', 'Créer une vidéo', 'Accorder une guitare', 'Filmer un concert'], correct: 0 },
  { category: 'musique', question: 'Comment appelle-t-on une personne qui crée des rythmes pour un morceau?', options: ['Un beatmaker', 'Un arbitre', 'Un scénariste', 'Un gardien'], correct: 0 },
  { category: 'musique', question: 'Que signifie écouter un album en streaming?', options: ['Le lire via internet', 'Le graver sur pierre', 'Le dessiner', 'Le jouer au cinéma'], correct: 0 },
  { category: 'musique', question: 'Quel festival montréalais est connu pour le jazz?', options: ['Festival International de Jazz de Montréal', 'Festival de Cannes', 'Comic-Con', 'Tour de France'], correct: 0 },
  { category: 'musique', question: 'Quelle action respecte le travail des artistes?', options: ['Citer et soutenir les créateurs', 'Reposter sans crédit', 'Voler un morceau', 'Supprimer le nom'], correct: 0 },
  { category: 'musique', question: 'Qu’est-ce qu’une playlist?', options: ['Une liste de morceaux', 'Un type de micro', 'Une salle de concert', 'Un instrument'], correct: 0 },
  /* ── Internet & Aura ── */
  { category: 'web', question: 'Tu vois une nouvelle douteuse: quel geste a le plus d’aura?', options: ['Vérifier la source avant de partager', 'La repartager vite', 'Insulter les gens', 'Inventer un titre'], correct: 0 },
  { category: 'web', question: 'Que veut dire “farm aura” dans la culture web?', options: ['Accumuler des moments perçus comme stylés ou respectables', 'Cultiver des plantes en ligne', 'Pirater un compte', 'Acheter des abonnés'], correct: 0 },
  { category: 'web', question: 'Quel mot de passe est le plus solide?', options: ['Une phrase longue et unique', '123456', 'Ton prénom', 'Le nom de ton école'], correct: 0 },
  { category: 'web', question: 'Un ami est exclu dans un groupe: la meilleure réaction?', options: ['L’inclure et en parler avec respect', 'Ajouter des moqueries', 'Filmer la scène', 'Ignorer toujours'], correct: 0 },
  { category: 'web', question: 'Qu’est-ce qu’un “meme”?', options: ['Un contenu culturel repris et transformé', 'Un antivirus', 'Une application de banque', 'Un devoir'], correct: 0 },
  { category: 'web', question: 'Avant de publier une photo d’un ami, il faut?', options: ['Demander son accord', 'La publier sans lui dire', 'Changer son nom', 'Créer un faux compte'], correct: 0 },
  { category: 'web', question: 'Que signifie “DM”?', options: ['Message direct', 'Dernier match', 'Double musique', 'Document média'], correct: 0 },
  { category: 'web', question: 'Quel comportement protège le mieux ta vie privée?', options: ['Limiter les infos personnelles publiques', 'Publier son adresse', 'Partager ses mots de passe', 'Accepter tous les inconnus'], correct: 0 },
  { category: 'web', question: 'Un commentaire te blesse: quelle action est utile?', options: ['Bloquer, signaler ou parler à un adulte de confiance', 'Répondre avec haine', 'Donner ton mot de passe', 'Tout partager'], correct: 0 },
  { category: 'web', question: 'Quel geste est le plus “clean” dans un débat en ligne?', options: ['Être en désaccord sans attaquer la personne', 'Humilier les autres', 'Inventer des preuves', 'Spam les messages'], correct: 0 },
  /* ── Actu & médias ── */
  { category: 'actu', question: 'Avant de partager une nouvelle, quel réflexe est essentiel?', options: ['Lire la source et la date', 'Lire seulement le titre', 'Regarder les commentaires', 'Partager tout de suite'], correct: 0 },
  { category: 'actu', question: 'Qu’est-ce qu’une source primaire?', options: ['Un témoignage ou document direct', 'Un meme', 'Une rumeur', 'Une publicité'], correct: 0 },
  { category: 'actu', question: 'Quel signe peut indiquer un contenu trompeur?', options: ['Un titre très émotionnel sans source', 'Une date claire', 'Un auteur identifié', 'Un lien officiel'], correct: 0 },
  { category: 'actu', question: 'Que signifie “contexte” dans une information?', options: ['Les éléments qui aident à la comprendre', 'La taille du texte', 'La couleur du site', 'Le nombre de likes'], correct: 0 },
  { category: 'actu', question: 'Quel organisme gère les élections fédérales au Canada?', options: ['Élections Canada', 'La STM', 'Hydro-Québec', 'Radio-Canada'], correct: 0 },
  { category: 'actu', question: 'Quel niveau de gouvernement s’occupe de la ville de Montréal?', options: ['Municipal', 'Fédéral seulement', 'International', 'Scolaire seulement'], correct: 0 },
  { category: 'actu', question: 'Qu’est-ce qu’un fait vérifié?', options: ['Une information confirmée par des sources fiables', 'Une opinion populaire', 'Une rumeur répétée', 'Un commentaire anonyme'], correct: 0 },
  { category: 'actu', question: 'Pourquoi comparer plusieurs sources?', options: ['Pour réduire le risque d’erreur', 'Pour aller moins vite', 'Pour cacher une info', 'Pour augmenter les likes'], correct: 0 },
  { category: 'actu', question: 'Que signifie “désinformation”?', options: ['Information fausse ou trompeuse diffusée', 'Information officielle', 'Un bulletin météo', 'Une citation exacte'], correct: 0 },
  { category: 'actu', question: 'Quelle est la meilleure réponse à une vidéo virale choquante?', options: ['Vérifier avant de croire ou partager', 'La croire automatiquement', 'L’envoyer à tout le monde', 'Ajouter un filtre'], correct: 0 },
  /* Questions supplémentaires — catégories MDJ */
  { category: 'rdp', question: 'Quel moyen de transport collectif dessert Montréal?', options: ['La STM', 'La NASA', 'VIA Rail seulement', 'La SAAQ'], correct: 0 },
  { category: 'rdp', question: 'RDP fait partie de quelle ville?', options: ['Montréal', 'Laval', 'Longueuil', 'Québec'], correct: 0 },
  { category: 'rdp', question: 'Quel espace public est idéal pour se retrouver dans un quartier?', options: ['Un parc', 'Une autoroute', 'Un stationnement privé', 'Un entrepôt'], correct: 0 },
  { category: 'rdp', question: 'Que signifie “communauté” dans un quartier?', options: ['Les personnes qui vivent et participent ensemble', 'Une marque de vêtements', 'Un seul immeuble', 'Une application'], correct: 0 },
  { category: 'mdj', question: 'Une MDJ encourage surtout quel type de participation?', options: ['La participation volontaire des jeunes', 'Les achats obligatoires', 'Les examens quotidiens', 'Le travail sans pause'], correct: 0 },
  { category: 'mdj', question: 'Quel comportement contribue à un espace MDJ sécuritaire?', options: ['Le respect des autres', 'L’intimidation', 'Les insultes', 'Exclure les nouveaux'], correct: 0 },
  { category: 'mdj', question: 'Que peux-tu faire si tu as une idée d’activité?', options: ['La proposer aux animateurs', 'La garder secrète obligatoirement', 'Quitter sans parler', 'L’imposer aux autres'], correct: 0 },
  { category: 'mdj', question: 'Pourquoi choisir un pseudo dans l’Arcade?', options: ['Participer sans afficher son nom complet', 'Acheter un jeu', 'Changer d’âge', 'Supprimer les règles'], correct: 0 },
  { category: 'culture', question: 'Quel fleuve traverse le sud de Montréal?', options: ['Le Saint-Laurent', 'Le Nil', 'Le Mississippi', 'Le Danube'], correct: 0 },
  { category: 'culture', question: 'Que célèbre souvent la Francophonie?', options: ['La langue et les cultures francophones', 'Une seule équipe sportive', 'Les voitures', 'Les devoirs'], correct: 0 },
  { category: 'culture', question: 'Quel art utilise souvent des murs autorisés pour créer?', options: ['Le muralisme', 'La natation', 'La cuisine', 'Le codage'], correct: 0 },
  { category: 'culture', question: 'Montréal est reconnue comme une ville de?', options: ['Festivals et cultures diverses', 'Déserts', 'Volcans actifs', 'Plages tropicales'], correct: 0 },
  { category: 'sport', question: 'Combien de joueurs une équipe de basketball a-t-elle sur le terrain?', options: ['5', '3', '7', '11'], correct: 0 },
  { category: 'sport', question: 'Quel équipement protège la tête au hockey?', options: ['Un casque', 'Un gant de baseball', 'Une raquette', 'Un sifflet'], correct: 0 },
  { category: 'sport', question: 'Que favorise le fair-play?', options: ['Le respect des règles et adversaires', 'La triche', 'Les insultes', 'Abandonner son équipe'], correct: 0 },
  { category: 'sport', question: 'Quel sport se joue avec un ballon rond et des buts?', options: ['Le soccer', 'Le tennis', 'Le golf', 'Le baseball'], correct: 0 },
  { category: 'entrepreneuriat', question: 'Qu’est-ce qu’un budget?', options: ['Un plan pour gérer revenus et dépenses', 'Un type de logo', 'Une vidéo', 'Un jeu de cartes'], correct: 0 },
  { category: 'entrepreneuriat', question: 'Quel élément rend une idée de projet plus solide?', options: ['Écouter les besoins des personnes', 'Copier sans réfléchir', 'Ne rien préparer', 'Ignorer les retours'], correct: 0 },
  { category: 'entrepreneuriat', question: 'Qu’est-ce qu’un client?', options: ['Une personne qui utilise ou achète une offre', 'Un type de micro', 'Un concurrent sportif', 'Un professeur'], correct: 0 },
  { category: 'entrepreneuriat', question: 'Pourquoi faire un prototype?', options: ['Tester une idée avant de la finaliser', 'Éviter tout essai', 'Augmenter le prix au hasard', 'Cacher le projet'], correct: 0 },
  { category: 'sante', question: 'Quel geste aide à récupérer après une activité physique?', options: ['Boire de l’eau et se reposer', 'Ne jamais dormir', 'Sauter tous les repas', 'Rester blessé sans le dire'], correct: 0 },
  { category: 'sante', question: 'À qui parler si tu ne vas pas bien?', options: ['Un adulte ou professionnel de confiance', 'À personne jamais', 'Seulement à un inconnu', 'Aux réseaux sociaux uniquement'], correct: 0 },
  { category: 'sante', question: 'Pourquoi les pauses d’écran peuvent aider?', options: ['Elles reposent les yeux et l’attention', 'Elles cassent le téléphone', 'Elles empêchent de respirer', 'Elles remplacent le sommeil'], correct: 0 },
  { category: 'sante', question: 'Quel choix soutient le bien-être?', options: ['Avoir des routines de repos et de mouvement', 'S’isoler toujours', 'Ignorer la fatigue', 'Ne jamais demander d’aide'], correct: 0 },
  { category: 'prevention', question: 'Le consentement peut-il être retiré?', options: ['Oui, à tout moment', 'Jamais', 'Seulement par message', 'Seulement le lundi'], correct: 0 },
  { category: 'prevention', question: 'Que faire face à de l’intimidation?', options: ['En parler et demander de l’aide', 'La garder secrète par peur', 'Se venger seul', 'La diffuser'], correct: 0 },
  { category: 'prevention', question: 'Un droit important des jeunes est?', options: ['Être traité avec dignité', 'Être exclu', 'Être insulté', 'Ne pas être écouté'], correct: 0 },
  { category: 'prevention', question: 'Quel numéro appeler en situation d’urgence immédiate?', options: ['911', '411', '811', '311'], correct: 0 },
  { category: 'enjeux', question: 'Quel objet est préférable pour réduire les déchets?', options: ['Une gourde réutilisable', 'Une bouteille jetable chaque fois', 'Un sac non réutilisable', 'Un emballage de plus'], correct: 0 },
  { category: 'enjeux', question: 'Pourquoi réparer un objet?', options: ['Prolonger son usage et éviter un déchet', 'Le rendre inutile', 'Créer plus de déchets', 'Le cacher'], correct: 0 },
  { category: 'enjeux', question: 'Quel déplacement émet généralement moins qu’une auto solo?', options: ['Le vélo ou la marche', 'Un jet privé', 'Une voiture vide', 'Un camion'], correct: 0 },
  { category: 'enjeux', question: 'Que peut-on faire avec des vêtements encore en bon état?', options: ['Les donner ou les réutiliser', 'Les jeter automatiquement', 'Les brûler', 'Les cacher'], correct: 0 },
]

const ROUND_LENGTH = 10
const PRIZE_LADDER = [100, 250, 500, 750, 1250, 2000, 3000, 5000, 7500, 10000]

function getTimeForQuestion(index: number): number {
  if (index < 3) return 25
  if (index < 6) return 20
  if (index < 8) return 15
  return 12
}

function getSafePrize(index: number): number {
  if (index >= 6) return PRIZE_LADDER[6]
  if (index >= 2) return PRIZE_LADDER[2]
  return 0
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function randomizeAnswers(question: Question): Question {
  const choices = shuffle(question.options.map((option, index) => ({ option, index })))
  return {
    ...question,
    options: choices.map(choice => choice.option),
    correct: choices.findIndex(choice => choice.index === question.correct),
  }
}

/* ── Shell wrapper ──────────────────────────────────────────────── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-start justify-center relative overflow-x-hidden" style={{ background: BRAND.dark }}>
      <div className="w-full max-w-md mx-auto min-h-dvh flex flex-col">
        {children}
      </div>
    </div>
  )
}

type GameState = 'home' | 'playing' | 'result' | 'scores'

interface QuizChallenge {
  challenger: string
  target: number
  category: CategoryId
}

function getQuizChallenge(): QuizChallenge | null {
  const params = new URLSearchParams(window.location.search)
  const category = params.get('theme')
  const challenger = params.get('from')?.trim().slice(0, 14)
  const target = Number(params.get('target'))
  if (!challenger || !categories.some(item => item.id === category) || !Number.isFinite(target) || target < 1) return null
  return { challenger, target: Math.min(Math.round(target), 1200), category: category as CategoryId }
}

export default function QuizGame() {
  const [gameState, setGameState]         = useState<GameState>('home')
  const [scoresFrom, setScoresFrom]       = useState<'home' | 'result'>('home')
  const [selectedCat, setSelectedCat]     = useState<CategoryId | null>(null)
  const [shuffled, setShuffled]           = useState<Question[]>([])
  const [current, setCurrent]             = useState(0)
  const [score, setScore]                 = useState(0)
  const [safeScore, setSafeScore]         = useState(0)
  const [timeLeft, setTimeLeft]           = useState(getTimeForQuestion(0))
  const [isAnswered, setIsAnswered]       = useState(false)
  const [selected, setSelected]           = useState<number | null>(null)
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null)
  const [fiftyUsed, setFiftyUsed]         = useState(false)
  const [timeUsed, setTimeUsed]           = useState(false)
  const [switchUsed, setSwitchUsed]       = useState(false)
  const [eliminated, setEliminated]       = useState<number[]>([])
  const [playerName]                      = useState<string>(getSessionName)
  const [localScores, setLocalScores]     = useState<GameRank[]>(() => getGameTopRanking('quiz', 5))
  const [challenge]                       = useState<QuizChallenge | null>(getQuizChallenge)

  /* ── Timer ── */
  useEffect(() => {
    if (gameState !== 'playing' || isAnswered) return
    if (timeLeft <= 0) { handleAnswer(-1); return }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [gameState, isAnswered, timeLeft])

  function startGame(catId: CategoryId) {
    setSelectedCat(catId)
    const pool = ALL_QUESTIONS.filter(q => q.category === catId)
    const qs = shuffle(pool.length >= ROUND_LENGTH ? pool : [...pool, ...ALL_QUESTIONS.filter(q => q.category !== catId)]).slice(0, ROUND_LENGTH).map(randomizeAnswers)
    setShuffled(qs)
    setCurrent(0)
    setScore(0)
    setSafeScore(0)
    setTimeLeft(getTimeForQuestion(0))
    setIsAnswered(false)
    setSelected(null)
    setPendingAnswer(null)
    setFiftyUsed(false)
    setTimeUsed(false)
    setSwitchUsed(false)
    setEliminated([])
    setGameState('playing')
  }

  function handleAnswer(idx: number) {
    if (isAnswered) return
    setIsAnswered(true)
    setSelected(idx)
    const correct = shuffled[current].correct
    if (idx === correct) {
      const prize = PRIZE_LADDER[current]
      setScore(prize)
      setSafeScore(getSafePrize(current))
    }
  }

  function confirmAnswer(): void {
    if (pendingAnswer === null || !q || isAnswered) return
    const answer = pendingAnswer
    handleAnswer(answer)
    if (answer === q.correct) window.setTimeout(nextQuestion, 900)
  }

  function nextQuestion() {
    if (current + 1 >= shuffled.length) { endGame(PRIZE_LADDER[current]); return }
    setCurrent(c => c + 1)
    setTimeLeft(getTimeForQuestion(current + 1))
    setIsAnswered(false)
    setSelected(null)
    setPendingAnswer(null)
    setEliminated([])
  }

  function endGame(finalScore = score) {
    const name = playerName || 'Joueur'
    recordGameScore('quiz', name, finalScore)
    addXp(name, Math.max(10, Math.round(finalScore / 10)))
    setLocalScores(getGameTopRanking('quiz', 5))
    setGameState('result')
  }

  function useFifty(): void {
    if (fiftyUsed || isAnswered || !q) return
    const wrongAnswers = shuffle(q.options.map((_, index) => index).filter(index => index !== q.correct)).slice(0, 2)
    setEliminated(wrongAnswers)
    setFiftyUsed(true)
  }

  function useExtraTime(): void {
    if (timeUsed || isAnswered) return
    setTimeLeft(time => time + 10)
    setTimeUsed(true)
  }

  function useSwitch(): void {
    if (switchUsed || isAnswered || !q) return
    const replacement = shuffle(ALL_QUESTIONS.filter(question => !shuffled.some(used => used.question === question.question)))[0]
    if (!replacement) return
    setShuffled(questions => questions.map((question, index) => index === current ? randomizeAnswers(replacement) : question))
    setEliminated([])
    setSwitchUsed(true)
  }

  function goToScores(from: 'home' | 'result') {
    setScoresFrom(from)
    setGameState('scores')
  }

  const q          = shuffled[current]
  const catDef     = categories.find(c => c.id === selectedCat)
  const questionCat = categories.find(c => c.id === q?.category) ?? catDef
  const challengeCategory = categories.find(c => c.id === challenge?.category)
  const catColor   = questionCat?.color ?? BRAND.orange
  const timerLimit = getTimeForQuestion(current)
  const timerPct   = Math.min((timeLeft / timerLimit) * 100, 100)
  const timerColor = timeLeft > timerLimit * 0.6 ? catColor : timeLeft > timerLimit * 0.3 ? BRAND.yellow : BRAND.pink

  /* ══════════════════════════════
     HOME SCREEN
  ══════════════════════════════ */
  if (gameState === 'home') {
    return (
      <Shell>
        {/* Background blobs */}
        <div aria-hidden className="pointer-events-none absolute top-20 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: `${BRAND.yellow}18` }} />
        <div aria-hidden className="pointer-events-none absolute bottom-20 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: `${BRAND.pink}18` }} />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: `${BRAND.blue}10` }} />

        <div className="relative z-10 flex flex-col flex-1 px-5 py-10 text-white">
          {/* Logo + title */}
          <div className="flex flex-col items-center text-center mb-6">
            <img src="/mdj-logo-white.png" className="h-16 w-auto mx-auto mb-4" alt="MDJ-RDP" />
            <h1
              className="font-black text-4xl leading-tight"
              style={{
                background: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.pink}, ${BRAND.blue})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Quiz MDJ
            </h1>
            <p className="text-white/60 text-sm mt-1">10 questions. Jusqu’à 10 000 XP.</p>
          </div>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Joueur</p>
            <p className="mt-1 font-black text-white">{playerName || 'Joueur'}</p>
          </div>

          {challenge && challengeCategory && (
            <div className="mb-6 rounded-2xl border-2 px-5 py-4 text-center" style={{ borderColor: `${challengeCategory.color}80`, background: `${challengeCategory.color}18` }}>
              <p className="text-xs font-bold uppercase tracking-widest text-white/55">Défi reçu</p>
              <p className="mt-1 text-sm text-white"><strong>{challenge.challenger}</strong> a marqué <strong style={{ color: BRAND.yellow }}>{challenge.target} pts</strong></p>
              <p className="mt-1 text-xs text-white/60">{challengeCategory.emoji} {challengeCategory.label}</p>
              <button onClick={() => startGame(challenge.category)} className="mt-3 min-h-[48px] w-full rounded-xl px-4 text-sm font-black text-white" style={{ background: `linear-gradient(135deg, ${challengeCategory.color}, ${BRAND.pink})` }}>
                Relever le défi ⚔️
              </button>
            </div>
          )}

          {/* Category grid */}
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 text-center">
            Choisis une catégorie
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => startGame(cat.id)}
                className="flex items-center gap-3 rounded-2xl px-4 py-4 min-h-[56px] text-left font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: `${cat.color}20`,
                  border: `1.5px solid ${cat.color}50`,
                }}
              >
                <span className="text-xl shrink-0">{cat.emoji}</span>
                <span className="text-sm leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Leaderboard link */}
          <button
            onClick={() => goToScores('home')}
            className="text-white/40 text-sm underline underline-offset-2 hover:text-white/60 transition-colors text-center"
          >
            Voir le classement
          </button>
        </div>
      </Shell>
    )
  }

  /* ══════════════════════════════
     PLAYING SCREEN
  ══════════════════════════════ */
  if (gameState === 'playing' && q) {
    return (
      <Shell>
        <h1 className="sr-only">Quiz MDJ</h1>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 shrink-0 text-white">
          <span className="text-white/50 text-sm font-semibold">{current + 1} / {shuffled.length}</span>
          <div className="flex items-center gap-1.5">
            {questionCat && <span className="text-base">{questionCat.emoji}</span>}
            <Clock size={18} style={{ color: timerColor }} />
            <span className="font-black text-xl tabular-nums" style={{ color: timerColor }}>{timeLeft}s</span>
          </div>
          <span className="font-bold" style={{ color: BRAND.yellow }}>★ {score} XP</span>
        </div>

        {/* Timer bar */}
        <div className="h-1.5 mx-4 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>

        <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
          <button onClick={useFifty} disabled={fiftyUsed || isAnswered} className="min-h-[40px] rounded-xl border px-2 text-[10px] font-black disabled:opacity-35" style={{ borderColor: `${BRAND.blue}80`, background: `${BRAND.blue}18`, color: BRAND.blue }}>50 / 50</button>
          <button onClick={useExtraTime} disabled={timeUsed || isAnswered} className="min-h-[40px] rounded-xl border px-2 text-[10px] font-black disabled:opacity-35" style={{ borderColor: `${BRAND.yellow}80`, background: `${BRAND.yellow}18`, color: BRAND.yellow }}>+10 s</button>
          <button onClick={useSwitch} disabled={switchUsed || isAnswered} className="min-h-[40px] rounded-xl border px-2 text-[10px] font-black disabled:opacity-35" style={{ borderColor: `${BRAND.pink}80`, background: `${BRAND.pink}18`, color: BRAND.pink }}>↻ Switch</button>
        </div>

        <div className="mx-4 mt-3 grid grid-cols-5 gap-1" aria-label="Échelle des récompenses">
          {PRIZE_LADDER.map((prize, index) => (
            <span key={prize} className="rounded-md px-1 py-1 text-center text-[9px] font-black" style={{ background: index === current ? BRAND.orange : 'rgba(255,255,255,0.07)', color: index === current ? BRAND.dark : index === 2 || index === 6 ? BRAND.yellow : 'rgba(255,255,255,0.55)' }}>
              {index === 2 || index === 6 ? '◆ ' : ''}{prize >= 1000 ? `${prize / 1000}k` : prize}
            </span>
          ))}
        </div>

        {/* Question + answers */}
        <div className="flex-1 px-4 py-3 text-white">
          <div
            className="rounded-3xl p-4 mb-3"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: catColor }}>
              {questionCat?.label ?? 'Question'} · palier {PRIZE_LADDER[current]} XP
            </p>
            <p className="font-bold text-base leading-snug text-white">{q.question}</p>
          </div>

          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              let bg        = 'rgba(255,255,255,0.10)'
              let border    = 'rgba(255,255,255,0.10)'
              let textColor = '#ffffff'

              if (isAnswered) {
                if (i === q.correct) {
                  bg = `${BRAND.green}30`; border = BRAND.green; textColor = BRAND.green
                } else if (i === selected && i !== q.correct) {
                  bg = `${BRAND.pink}30`; border = BRAND.pink; textColor = BRAND.pink
                }
              }

              const isEliminated = eliminated.includes(i)
              return (
                <button
                  key={i}
                  onClick={() => setPendingAnswer(i)}
                  disabled={isAnswered || isEliminated}
                  className="flex items-center gap-4 w-full min-h-[52px] rounded-2xl px-4 py-3 text-left font-semibold transition-all disabled:cursor-not-allowed"
                  style={{ background: isEliminated ? 'rgba(255,255,255,0.03)' : pendingAnswer === i && !isAnswered ? `${catColor}30` : bg, border: `2px solid ${isEliminated ? 'rgba(255,255,255,0.04)' : pendingAnswer === i && !isAnswered ? catColor : border}`, color: isEliminated ? 'rgba(255,255,255,0.22)' : textColor }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm leading-snug">{isEliminated ? 'Réponse éliminée' : opt}</span>
                  {isAnswered && i === q.correct && <CheckCircle size={20} className="shrink-0" style={{ color: BRAND.green }} />}
                  {isAnswered && i === selected && i !== q.correct && <XCircle size={20} className="shrink-0" style={{ color: BRAND.pink }} />}
                </button>
              )
            })}
          </div>

          <div className="mt-3 min-h-[82px]">
          {!isAnswered && pendingAnswer !== null && (
            <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-center">
              <p className="text-sm font-bold text-white">Tu choisis « {q.options[pendingAnswer]} ». C’est ton choix final?</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => setPendingAnswer(null)} className="min-h-[44px] rounded-xl border border-white/20 text-sm font-bold text-white/70">Modifier</button>
                <button onClick={confirmAnswer} className="min-h-[44px] rounded-xl text-sm font-black text-white" style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}>Confirmer</button>
              </div>
            </div>
          )}
          {isAnswered && (
            <div>
              <p className="text-center text-sm font-semibold mb-3" style={{ color: selected === q.correct ? BRAND.green : BRAND.pink }}>
                {selected === q.correct
                  ? `Bravo! Tu passes à ${PRIZE_LADDER[Math.min(current + 1, PRIZE_LADDER.length - 1)]} XP.`
                  : selected === -1 ? `Temps écoulé! Tu gardes ${safeScore} XP.` : `Mauvaise réponse! Tu gardes ${safeScore} XP.`}
              </p>
              {selected === q.correct ? (
                <p className="min-h-[56px] rounded-2xl px-4 pt-4 text-center text-sm font-bold text-white/75">Question suivante…</p>
              ) : (
                <button
                  onClick={() => endGame(safeScore)}
                  className="w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}
                >
                  Voir mes résultats
                </button>
              )}
            </div>
          )}
          {!isAnswered && score > 0 && (
            <button onClick={() => endGame(score)} className="mt-2 min-h-[40px] text-center text-xs font-bold text-white/45 underline underline-offset-4 hover:text-white">
              Encaisser {score} XP et quitter
            </button>
          )}
          </div>
        </div>
      </Shell>
    )
  }

  /* ══════════════════════════════
     RESULT SCREEN
  ══════════════════════════════ */
  if (gameState === 'result') {
    const maxScore  = PRIZE_LADDER[PRIZE_LADDER.length - 1]
    const pct       = Math.round((score / maxScore) * 100)
    const medal     = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉'
    const msg       = pct >= 80 ? 'Exceptionnel!' : pct >= 50 ? 'Bien joué!' : 'Continue à pratiquer!'
    const scoreColor = score >= 800 ? BRAND.yellow : score >= 500 ? BRAND.blue : BRAND.pink

    return (
      <Shell>
        <h1 className="sr-only">Quiz MDJ — Résultat</h1>
        <div className="flex flex-col items-center text-center flex-1 justify-center px-6 py-12 text-white">
          {/* Trophy circle */}
          <div
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-6"
            style={{ background: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.pink})` }}
          >
            {medal}
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold">Résultat final</p>
          <h2 className="font-black text-4xl text-white mb-2">{msg}</h2>
          {catDef && (
            <p className="text-sm font-semibold mb-6" style={{ color: catDef.color }}>
              {catDef.emoji} {catDef.label}
            </p>
          )}

          {/* Score bubble */}
          <div
            className="rounded-3xl px-10 py-6 mb-8 w-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.10)' }}
          >
            <p className="font-black text-6xl tabular-nums" style={{ color: scoreColor }}>{score}</p>
            <p className="text-white/40 text-sm mt-1">XP sur {maxScore} max</p>
          </div>

          <ShareScore
            playerName={playerName}
            score={score}
            gameName="Quiz MDJ"
            challengeUrl={`${window.location.origin}/arcade?game=quiz&theme=${selectedCat ?? 'rdp'}&target=${score}&from=${encodeURIComponent(playerName || 'Joueur')}`}
            challengeText={`⚔️ Défi Quiz MDJ : ${playerName || 'Joueur'} a marqué ${score} pts en ${catDef?.label ?? 'Quiz MDJ'}. Peux-tu faire mieux?`}
          />

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 w-full">
            <button
              onClick={() => setGameState('home')}
              className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}
            >
              <RotateCcw size={18} />
              Nouvelle partie
            </button>
            <button
              onClick={() => goToScores('result')}
              className="w-full min-h-[56px] rounded-2xl font-semibold transition-colors hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.70)',
              }}
            >
              Classement
            </button>
          </div>

        </div>
      </Shell>
    )
  }

  /* ══════════════════════════════
     SCORES SCREEN
  ══════════════════════════════ */
  if (gameState === 'scores') {
    const rankColors = [BRAND.yellow, BRAND.blue, BRAND.orange, 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']

    return (
      <Shell>
        <h1 className="sr-only">Quiz MDJ — Classement</h1>
        <div className="flex flex-col flex-1 px-5 py-10 text-white">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setGameState(scoresFrom)}
              className="flex items-center gap-1 text-sm transition-colors hover:text-white/60"
              style={{ color: 'rgba(255,255,255,0.40)' }}
            >
              <ArrowLeft size={16} />
              Retour
            </button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.pink})` }}
            >
              <Trophy size={20} className="text-white" />
            </div>
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold text-center">MDJ ARCADE</p>
          <h2 className="font-black text-3xl text-white mb-2 text-center">Classement Quiz</h2>
          <p className="text-center text-sm text-white/45 mb-8">Meilleurs scores de la semaine</p>

          <div className="flex flex-col gap-3 flex-1">
            {localScores.length === 0 ? (
              <p className="text-white/40 text-center mt-10">
                Aucun joueur enregistré. Joue pour apparaître ici!
              </p>
            ) : (
              localScores.map((entry, i) => (
                <div
                  key={`quiz-score-${entry.name}-${i}`}
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 min-h-[56px]"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="font-black text-xl w-8 shrink-0" style={{ color: rankColors[i] ?? rankColors[4] }}>
                    {i + 1}
                  </span>
                  <span className="font-semibold text-white flex-1 text-left">{entry.name}</span>
                  <span className="font-bold text-sm tabular-nums" style={{ color: BRAND.yellow }}>
                    {entry.score} pts
                  </span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setGameState('home')}
            className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90 mt-8"
            style={{ background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.pink})` }}
          >
            Jouer
          </button>
        </div>
      </Shell>
    )
  }

  return null
}
