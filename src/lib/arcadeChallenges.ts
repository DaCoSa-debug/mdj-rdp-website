import { supabase } from './supabase'

export type ChallengeGame = 'quiz' | 'rdp-run' | 'snake' | 'rdp-blocs' | 'triki'

export interface ArcadeChallenge {
  id: string
  game: ChallengeGame
  theme: string
  challengerName: string
  targetScore: number
  expiresAt: string
}

export interface ChallengeAttempt {
  id: string
  playerName: string
  score: number
  completedAt: string
}

export async function createArcadeChallenge(game: ChallengeGame, theme: string, challengerName: string, targetScore: number): Promise<string | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('arcade_challenges')
    .insert({ game, theme, challenger_name: challengerName, target_score: targetScore })
    .select('id')
    .single()
  if (error || !data) return null
  return data.id as string
}

export const createQuizChallenge = (theme: string, challengerName: string, targetScore: number) => createArcadeChallenge('quiz', theme, challengerName, targetScore)

export async function getArcadeChallenge(id: string, game?: ChallengeGame): Promise<ArcadeChallenge | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('arcade_challenges')
    .select('id, game, theme, challenger_name, target_score, expires_at')
    .eq('id', id)
    .match(game ? { game } : {})
    .maybeSingle()
  if (error || !data) return null
  return {
    id: data.id as string,
    game: data.game as ChallengeGame,
    theme: data.theme as string,
    challengerName: data.challenger_name as string,
    targetScore: data.target_score as number,
    expiresAt: data.expires_at as string,
  }
}

export const getQuizChallenge = (id: string) => getArcadeChallenge(id, 'quiz')

export async function recordChallengeAttempt(challengeId: string, playerName: string, score: number): Promise<void> {
  if (!supabase) return
  await supabase.from('arcade_challenge_attempts').insert({
    challenge_id: challengeId,
    player_name: playerName,
    score,
  })
}

export function recordCurrentChallengeAttempt(game: ChallengeGame, playerName: string, score: number): void {
  const params = new URLSearchParams(window.location.search)
  const challengeId = params.get('challenge')
  const sharedGame = params.get('game')
  if (challengeId && sharedGame === game && playerName) void recordChallengeAttempt(challengeId, playerName, score)
}

export async function getChallengeAttempts(challengeId: string): Promise<ChallengeAttempt[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('arcade_challenge_attempts')
    .select('id, player_name, score, completed_at')
    .eq('challenge_id', challengeId)
    .order('score', { ascending: false })
    .limit(5)
  if (error || !data) return []
  return data.map(attempt => ({
    id: attempt.id as string,
    playerName: attempt.player_name as string,
    score: attempt.score as number,
    completedAt: attempt.completed_at as string,
  }))
}
