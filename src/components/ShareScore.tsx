import { useState } from 'react'
import { copyScoreLink, shareScoreNative, generateScoreImage, downloadImage } from '../lib/shareScore'
import type { ShareData } from '../lib/shareScore'

export interface ShareScoreProps {
  playerName: string
  score: number
  gameName: string
  challengeUrl?: string
  challengeText?: string
}

export default function ShareScore({ playerName, score, gameName, challengeUrl, challengeText }: ShareScoreProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [feedback, setFeedback] = useState('')
  const data: ShareData = { playerName, score, gameName, url: challengeUrl, shareText: challengeText }

  async function handleShare(): Promise<void> {
    setIsSharing(true)
    const shared = await shareScoreNative(data)
    if (!shared) {
      const copied = await copyScoreLink(data)
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
      {feedback && <p className="text-center text-xs font-semibold text-[#FBB040]" role="status">{feedback}</p>}
    </div>
  )
}
