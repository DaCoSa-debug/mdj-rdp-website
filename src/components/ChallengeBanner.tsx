import { useEffect, useState } from 'react'
import { getArcadeChallenge, getChallengeAttempts } from '../lib/arcadeChallenges'
import type { ChallengeAttempt, ChallengeGame } from '../lib/arcadeChallenges'

export default function ChallengeBanner({ game }: { game: ChallengeGame }) {
  const challengeId = new URLSearchParams(window.location.search).get('challenge')
  const [target, setTarget] = useState<{ name: string; score: number } | null>(null)
  const [best, setBest] = useState<ChallengeAttempt | null>(null)

  useEffect(() => {
    if (!challengeId) return
    void getArcadeChallenge(challengeId, game).then(async challenge => {
      if (!challenge) return
      setTarget({ name: challenge.challengerName, score: challenge.targetScore })
      const attempts = await getChallengeAttempts(challenge.id)
      setBest(attempts[0] ?? null)
    })
  }, [challengeId, game])

  if (!target) return null
  return <div className="mb-3 rounded-2xl border border-[#FBB040]/50 bg-[#FBB040]/10 px-4 py-3 text-center text-white"><p className="text-[10px] font-black tracking-[.18em] text-[#FBB040]">DÉFI REÇU</p><p className="mt-1 text-sm"><strong>{target.name}</strong> a fait <strong>{target.score}</strong> pts. Fais mieux!</p>{best && <p className="mt-1 text-xs text-white/60">Meilleur essai: {best.playerName} — {best.score}</p>}</div>
}
