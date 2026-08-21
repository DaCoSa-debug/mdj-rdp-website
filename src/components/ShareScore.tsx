import { useState } from 'react'
import { copyScoreLink, shareScoreNative, generateScoreImage, downloadImage } from '../lib/shareScore'
import type { ShareData } from '../lib/shareScore'

export interface ShareScoreProps {
  playerName: string
  score: number
  gameName: string
  challengeUrl?: string
  challengeText?: string
  createChallengeUrl?: () => Promise<string | null>
}

export default function ShareScore({ playerName, score, gameName, challengeUrl, challengeText, createChallengeUrl }: ShareScoreProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [createdUrl, setCreatedUrl] = useState<string | null>(null)
  const data: ShareData = { playerName, score, gameName, url: challengeUrl, shareText: challengeText }

  async function handleShare(): Promise<void> {
    setIsSharing(true)
    const savedUrl = createChallengeUrl ? await createChallengeUrl() : null
    const shareData: ShareData = { ...data, url: savedUrl ?? data.url }
    if (savedUrl) {
      setCreatedUrl(savedUrl)
      setFeedback('Défi créé! Ouvre-le plus tard pour voir les résultats.')
    }
    const shared = await shareScoreNative(shareData)
    if (!shared) {
      const copied = await copyScoreLink(shareData)
      if (copied) setFeedback('Lien de défi copié!')
      else {
        const url = await generateScoreImage(data)
        downloadImage(url, 'mon-score-mdj.png')
      }
    }
    setIsSharing(false)
  }

  async function handleDownload(): Promise<void> {
    setIsSharing(true)
    const url = await generateScoreImage(data)
    downloadImage(url, 'mon-score-mdj.png')
    setIsSharing(false)
  }

  return (
    <div className="mt-2 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-white/45">Partage ton défi</p>
      <div className="flex flex-col gap-3">
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="rounded-full px-8 py-3 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #F7941E, #F05063)' }}
      >
        {challengeUrl ? '⚔️ Défier un ami' : '📲 Partager mon score'}
      </button>
      <button
        onClick={handleDownload}
        disabled={isSharing}
        className="bg-white/10 border border-white/20 rounded-full px-8 py-3 text-white font-semibold hover:bg-white/20 transition-colors disabled:opacity-40"
      >
        📸 Télécharger l'image
      </button>
      </div>
      {feedback && <p className="text-center text-xs font-semibold text-[#FBB040]" role="status">{feedback}</p>}
      {createdUrl && <a href={createdUrl} className="mt-3 block text-center text-xs font-bold text-white/70 underline underline-offset-4 hover:text-white">Voir les résultats du défi</a>}
    </div>
  )
}
