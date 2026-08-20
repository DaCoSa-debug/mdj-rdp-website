export interface ShareData {
  playerName: string
  score: number
  gameName: string
  url?: string
  shareText?: string
}

interface TextItem { text: string; y: number; color: string; font: string }

const CANVAS_W = 1080
const CANVAS_H = 1920

function drawBackground(ctx: CanvasRenderingContext2D): void {
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_H)
  gradient.addColorStop(0, '#F05063')
  gradient.addColorStop(1, '#29ABE2')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
}

function drawPanel(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba(35, 31, 32, 0.88)'
  ctx.fillRect(80, 580, CANVAS_W - 160, 780)
}

function drawText(ctx: CanvasRenderingContext2D, data: ShareData): void {
  const items: TextItem[] = [
    { text: 'MDJ Arcade', y: 220, color: 'rgba(255,255,255,0.7)', font: 'bold 72px sans-serif' },
    { text: data.playerName, y: 800, color: '#ffffff', font: 'bold 96px sans-serif' },
    { text: String(data.score), y: 1040, color: '#FBB040', font: 'bold 240px sans-serif' },
    { text: 'pts', y: 1140, color: 'rgba(255,255,255,0.7)', font: 'bold 72px sans-serif' },
    { text: data.gameName, y: 1280, color: '#ffffff', font: 'bold 80px sans-serif' },
    { text: 'mdjrdp.com', y: 1820, color: 'rgba(255,255,255,0.4)', font: '56px sans-serif' },
  ]
  ctx.textAlign = 'center'
  items.forEach(item => {
    ctx.fillStyle = item.color
    ctx.font = item.font
    ctx.fillText(item.text, CANVAS_W / 2, item.y)
  })
}

export function generateScoreImage(data: ShareData): Promise<string> {
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.resolve('')
  drawBackground(ctx)
  drawPanel(ctx)
  drawText(ctx, data)
  return Promise.resolve(canvas.toDataURL('image/png'))
}

export async function shareScoreNative(data: ShareData): Promise<boolean> {
  if (!navigator.share) return false
  try {
    const text = data.shareText ?? `J'ai fait ${data.score} points au ${data.gameName} de la MDJ-RDP! 🎮🔥`
    await navigator.share({ title: 'MDJ Arcade', text, url: data.url ?? window.location.origin })
    return true
  } catch { return false }
}

export async function copyScoreLink(data: ShareData): Promise<boolean> {
  if (!navigator.clipboard) return false
  try {
    const text = data.shareText ?? `J'ai fait ${data.score} points au ${data.gameName} de la MDJ-RDP! 🎮🔥`
    await navigator.clipboard.writeText(`${text}\n${data.url ?? window.location.origin}`)
    return true
  } catch { return false }
}

export function downloadImage(dataUrl: string, filename: string): void {
  try {
    const anchor = document.createElement('a')
    anchor.href = dataUrl
    anchor.download = filename
    anchor.click()
  } catch { /* noop */ }
}
