export interface PlayerRank {
  name: string
  totalScore: number
  lastUpdated: string
}

export type ArcadeGameId = 'rdp-run' | 'quiz' | 'triki' | 'snake'

export interface GameRank {
  name: string
  score: number
  lastUpdated: string
}

const RANKING_KEY = 'mdj-arcade-ranking'
const GAME_RANKINGS_KEY = 'mdj-arcade-game-rankings'
const SESSION_KEY = 'mdj-arcade-session'
const RESET_KEY = 'mdj-arcade-last-reset'

function persistRanking(list: PlayerRank[]): void {
  try {
    const sorted = [...list].sort((a, b) => b.totalScore - a.totalScore)
    localStorage.setItem(RANKING_KEY, JSON.stringify(sorted))
  } catch { /* noop */ }
}

function persistGameRankings(rankings: Partial<Record<ArcadeGameId, GameRank[]>>): void {
  try { localStorage.setItem(GAME_RANKINGS_KEY, JSON.stringify(rankings)) } catch { /* noop */ }
}

function findPlayerIndex(list: Array<{ name: string }>, name: string): number {
  const lower = name.toLowerCase()
  return list.findIndex(p => p.name.toLowerCase() === lower)
}

export function getLastSundayReset(): Date {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const isSundayEvening = dayOfWeek === 0 && now.getHours() >= 20
  const daysBack = isSundayEvening ? 0 : dayOfWeek === 0 ? 7 : dayOfWeek
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - daysBack)
  sunday.setHours(20, 0, 0, 0)
  return sunday
}

export function checkAndApplyWeeklyReset(): void {
  try {
    const lastReset = localStorage.getItem(RESET_KEY)
    const resetDate = getLastSundayReset()
    if (!lastReset || new Date(lastReset) < resetDate) {
      localStorage.setItem(RANKING_KEY, JSON.stringify([]))
      localStorage.setItem(GAME_RANKINGS_KEY, JSON.stringify({}))
      localStorage.setItem(RESET_KEY, resetDate.toISOString())
    }
  } catch { /* noop */ }
}

function loadGameRankings(): Partial<Record<ArcadeGameId, GameRank[]>> {
  checkAndApplyWeeklyReset()
  try { return JSON.parse(localStorage.getItem(GAME_RANKINGS_KEY) || '{}') as Partial<Record<ArcadeGameId, GameRank[]>> } catch { return {} }
}

export function loadRanking(): PlayerRank[] {
  checkAndApplyWeeklyReset()
  try {
    const raw = localStorage.getItem(RANKING_KEY) || '[]'
    const list = JSON.parse(raw) as PlayerRank[]
    return list.sort((a, b) => b.totalScore - a.totalScore)
  } catch { return [] }
}

export function addXp(name: string, points: number): void {
  try {
    const list = loadRanking()
    const index = findPlayerIndex(list, name)
    const now = new Date().toISOString()
    if (index >= 0) {
      list[index] = { ...list[index], totalScore: list[index].totalScore + points, lastUpdated: now }
    } else {
      list.push({ name, totalScore: points, lastUpdated: now })
    }
    persistRanking(list)
  } catch { /* noop */ }
}

// Kept for backwards compatibility with older game components.
export const addPoints = addXp

export function getTopRanking(limit: number): PlayerRank[] {
  return loadRanking().slice(0, limit)
}

export function getGameTopRanking(game: ArcadeGameId, limit: number): GameRank[] {
  return [...(loadGameRankings()[game] ?? [])].sort((a, b) => b.score - a.score).slice(0, limit)
}

export function getPlayerGameScore(game: ArcadeGameId, name: string): number {
  return getGameTopRanking(game, Number.MAX_SAFE_INTEGER).find(entry => entry.name.toLowerCase() === name.toLowerCase())?.score ?? 0
}

export function recordGameScore(game: ArcadeGameId, name: string, score: number): void {
  if (!name || score <= 0) return
  try {
    const rankings = loadGameRankings()
    const list = rankings[game] ?? []
    const index = findPlayerIndex(list, name)
    const now = new Date().toISOString()
    if (index < 0) list.push({ name, score, lastUpdated: now })
    else if (score > list[index].score) list[index] = { ...list[index], score, lastUpdated: now }
    rankings[game] = list.sort((a, b) => b.score - a.score)
    persistGameRankings(rankings)
  } catch { /* noop */ }
}

export function addGameWin(game: 'triki', name: string, amount = 1): void {
  if (!name || amount <= 0) return
  try {
    const rankings = loadGameRankings()
    const list = rankings[game] ?? []
    const index = findPlayerIndex(list, name)
    const now = new Date().toISOString()
    if (index < 0) list.push({ name, score: amount, lastUpdated: now })
    else list[index] = { ...list[index], score: list[index].score + amount, lastUpdated: now }
    rankings[game] = list.sort((a, b) => b.score - a.score)
    persistGameRankings(rankings)
  } catch { /* noop */ }
}

export function isNameReserved(name: string): boolean {
  return findPlayerIndex(loadRanking(), name) >= 0
}

export function suggestAvailableName(name: string): string {
  let counter = 2
  while (isNameReserved(`${name}${counter}`)) counter++
  return `${name}${counter}`
}

export function getSessionName(): string {
  try { return localStorage.getItem(SESSION_KEY) ?? '' } catch { return '' }
}

export function startSession(name: string): void {
  try {
    localStorage.setItem(SESSION_KEY, name)
    const list = loadRanking()
    if (findPlayerIndex(list, name) < 0) {
      list.push({ name, totalScore: 0, lastUpdated: new Date().toISOString() })
      persistRanking(list)
    }
  } catch { /* noop */ }
}

export function endSession(): void {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* noop */ }
}
