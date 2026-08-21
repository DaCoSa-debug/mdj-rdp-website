import { supabase } from './supabase'

export interface ArcadeChallenge {
  id: string
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

export async function createQuizChallenge(theme: string, challengerName: string, targetScore: number): Promise<string | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('arcade_challenges')
    .insert({ game: 'quiz', theme, challenger_name: challengerName, target_score: targetScore })
    .select('id')
    .single()
  if (error || !data) return null
  return data.id as string
}

export async function getQuizChallenge(id: string): Promise<ArcadeChallenge | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('arcade_challenges')
    .select('id, theme, challenger_name, target_score, expires_at')
    .eq('id', id)
    .eq('game', 'quiz')
    .maybeSingle()
  if (error || !data) return null
  return {
    id: data.id as string,
    theme: data.theme as string,
    challengerName: data.challenger_name as string,
    targetScore: data.target_score as number,
    expiresAt: data.expires_at as string,
  }
}

export async function recordChallengeAttempt(challengeId: string, playerName: string, score: number): Promise<void> {
  if (!supabase) return
  await supabase.from('arcade_challenge_attempts').insert({
    challenge_id: challengeId,
    player_name: playerName,
    score,
  })
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
