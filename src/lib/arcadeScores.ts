export interface GameScore {
  name: string
  score: number
  game: string
  date: string
}

function persistList(key: string, list: GameScore[]): void {
  try {
    const sorted = [...list].sort((a, b) => b.score - a.score).slice(0, 20)
    localStorage.setItem(key, JSON.stringify(sorted))
  } catch { /* noop */ }
}

function parseStoredList(key: string): GameScore[] {
  try {
    const raw = localStorage.getItem(key) || '[]'
    return (JSON.parse(raw) as GameScore[]).sort((a, b) => b.score - a.score)
  } catch { return [] }
}

export function loadScores(game: string): GameScore[] {
  return parseStoredList(`mdj-arcade-${game}`)
}

export function loadAllScores(): GameScore[] {
  return parseStoredList('mdj-arcade-all')
}

export function saveScore(entry: GameScore): void {
  try {
    persistList(`mdj-arcade-${entry.game}`, [...loadScores(entry.game), entry])
    persistList('mdj-arcade-all', [...loadAllScores(), entry])
  } catch { /* noop */ }
}

export function getTopScores(game: string, limit: number): GameScore[] {
  return loadScores(game).slice(0, limit)
}

export function getTopAllScores(limit: number): GameScore[] {
  return loadAllScores().slice(0, limit)
}

export function getPlayerName(): string {
  try { return localStorage.getItem('mdj_quiz_player_name') ?? '' } catch { return '' }
}

export function setPlayerName(name: string): void {
  try { localStorage.setItem('mdj_quiz_player_name', name) } catch { /* noop */ }
}

export function isNameTaken(name: string): boolean {
  const lower = name.toLowerCase()
  return loadAllScores().some(s => s.name.toLowerCase() === lower)
}

export function suggestAlternativeName(name: string): string {
  let counter = 2
  while (isNameTaken(`${name}${counter}`)) counter++
  return `${name}${counter}`
}
