import { useCallback, useEffect, useRef, useState } from 'react'
import { addXp, getSessionName, recordGameScore } from '../lib/arcadeScores'

const WIDTH = 960
const HEIGHT = 440
const GROUND_Y = 354
const PLAYER_X = 145
const PLAYER_W = 30
const PLAYER_H = 45
const GRAVITY = 1_650
const JUMP_VELOCITY = -620

function getPlayerX(): number {
  return window.matchMedia('(max-width: 639px)').matches ? 28 : PLAYER_X
}

type GameStatus = 'intro' | 'running' | 'over'

interface Obstacle { x: number; width: number; height: number; kind: 'crate' | 'cone' | 'platform' }
interface Coin { x: number; y: number; collected: boolean; value: number; color: string }

interface GameData {
  playerY: number
  velocityY: number
  obstacles: Obstacle[]
  coins: Coin[]
  distance: number
  coinCount: number
  coinPoints: number
  jumpsUsed: number
  speed: number
  obstacleTimer: number
  coinTimer: number
  lastTime: number
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
  context.fill()
}

function overlaps(aX: number, aY: number, aW: number, aH: number, bX: number, bY: number, bW: number, bH: number): boolean {
  return aX < bX + bW && aX + aW > bX && aY < bY + bH && aY + aH > bY
}

function readBest(): number {
  try { return Number(localStorage.getItem('mdj-rdp-run-best') ?? 0) } catch { return 0 }
}

interface RdpRunProps {
  onExit: () => void
}

export default function RdpRun({ onExit }: RdpRunProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const dataRef = useRef<GameData | null>(null)
  const statusRef = useRef<GameStatus>('intro')
  const savedScoreRef = useRef(false)
  const [status, setStatus] = useState<GameStatus>('intro')
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [best, setBest] = useState(readBest)

  const draw = useCallback((data: GameData) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const sky = context.createLinearGradient(0, 0, 0, HEIGHT)
    sky.addColorStop(0, '#29ABE2')
    sky.addColorStop(0.67, '#7dd7ef')
    sky.addColorStop(0.68, '#79b750')
    sky.addColorStop(1, '#438c43')
    context.fillStyle = sky
    context.fillRect(0, 0, WIDTH, HEIGHT)

    // Sun and Montreal/RDP-inspired skyline.
    context.fillStyle = 'rgba(255, 244, 181, .95)'
    context.beginPath()
    context.arc(770, 72, 38, 0, Math.PI * 2)
    context.fill()
    const shift = -(data.distance * 0.12 % 180)
    context.fillStyle = 'rgba(35, 72, 94, .38)'
    for (let x = shift - 180; x < WIDTH + 180; x += 180) {
      const index = Math.round((x - shift) / 180)
      const buildingHeight = 58 + Math.abs(index % 3) * 24
      context.fillRect(x, GROUND_Y - buildingHeight - 46, 90, buildingHeight)
      context.fillRect(x + 98, GROUND_Y - buildingHeight + 2 - 46, 55, buildingHeight - 2)
    }
    context.fillStyle = 'rgba(255, 255, 255, .35)'
    context.font = 'bold 18px system-ui, sans-serif'
    context.fillText('RIVIÈRE-DES-PRAIRIES', 565, 174)

    // Trees scrolling at a slower rate.
    const treeShift = -(data.distance * 0.32 % 128)
    for (let x = treeShift - 128; x < WIDTH + 128; x += 128) {
      context.fillStyle = '#744c34'
      context.fillRect(x + 44, 246, 10, 68)
      context.fillStyle = '#258443'
      context.beginPath()
      context.arc(x + 49, 234, 32, 0, Math.PI * 2)
      context.fill()
      context.fillStyle = '#35a951'
      context.beginPath()
      context.arc(x + 32, 251, 23, 0, Math.PI * 2)
      context.arc(x + 66, 254, 20, 0, Math.PI * 2)
      context.fill()
    }

    // Road.
    context.fillStyle = '#25313b'
    context.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y)
    context.fillStyle = '#fbb040'
    context.fillRect(0, GROUND_Y, WIDTH, 7)
    context.fillStyle = 'rgba(255,255,255,.75)'
    const roadShift = -(data.distance % 90)
    for (let x = roadShift; x < WIDTH; x += 90) context.fillRect(x, 405, 50, 5)

    // Coins.
    for (const coin of data.coins) {
      if (coin.collected) continue
      context.fillStyle = coin.color
      context.beginPath()
      context.arc(coin.x, coin.y, 13, 0, Math.PI * 2)
      context.fill()
      context.strokeStyle = coin.value > 50 ? '#dff8ff' : '#fff1a8'
      context.lineWidth = 3
      context.beginPath()
      context.arc(coin.x, coin.y, 7, 0, Math.PI * 2)
      context.stroke()
    }

    // Obstacles.
    for (const obstacle of data.obstacles) {
      const y = GROUND_Y - obstacle.height
      if (obstacle.kind === 'crate') {
        context.fillStyle = '#9d5831'
        roundedRect(context, obstacle.x, y, obstacle.width, obstacle.height, 4)
        context.strokeStyle = '#f1a964'
        context.lineWidth = 4
        context.beginPath()
        context.moveTo(obstacle.x + 6, y + 6)
        context.lineTo(obstacle.x + obstacle.width - 6, y + obstacle.height - 6)
        context.moveTo(obstacle.x + obstacle.width - 6, y + 6)
        context.lineTo(obstacle.x + 6, y + obstacle.height - 6)
        context.stroke()
      } else if (obstacle.kind === 'cone') {
        context.fillStyle = '#f05063'
        context.beginPath()
        context.moveTo(obstacle.x + obstacle.width / 2, y)
        context.lineTo(obstacle.x + obstacle.width, GROUND_Y)
        context.lineTo(obstacle.x, GROUND_Y)
        context.closePath()
        context.fill()
        context.fillStyle = '#fff'
        context.fillRect(obstacle.x + 8, y + obstacle.height * .58, obstacle.width - 16, 7)
      } else {
        context.fillStyle = '#516674'
        roundedRect(context, obstacle.x, y, obstacle.width, obstacle.height, 7)
        context.fillStyle = '#fbb040'
        context.fillRect(obstacle.x + 5, y + 10, obstacle.width - 10, 7)
        context.fillStyle = 'rgba(255,255,255,.35)'
        context.fillRect(obstacle.x + 12, y + 28, obstacle.width - 24, 4)
      }
    }

    // Runner, purposely simple and inclusive/cartoon-like.
    const px = getPlayerX()
    const py = data.playerY
    context.save()
    context.translate(px, py)
    context.scale(.72, .72)
    context.fillStyle = '#231f20'
    context.fillRect(11, 48, 8, 12)
    context.fillRect(25, 48, 8, 12)
    context.fillStyle = '#29abe2'
    roundedRect(context, 7, 22, 27, 30, 8)
    context.fillStyle = '#f5b88c'
    context.beginPath()
    context.arc(20, 14, 13, 0, Math.PI * 2)
    context.fill()
    context.fillStyle = '#f05063'
    context.fillRect(6, 1, 28, 7)
    context.fillRect(4, 7, 13, 5)
    context.fillStyle = '#231f20'
    context.fillRect(24, 12, 3, 3)
    context.fillStyle = '#fff'
    roundedRect(context, 6, 57, 15, 5, 3)
    roundedRect(context, 23, 57, 15, 5, 3)
    context.restore()
  }, [])

  const finishGame = useCallback((finalScore: number) => {
    statusRef.current = 'over'
    setStatus('over')
    setScore(finalScore)
    const previousBest = readBest()
    const nextBest = Math.max(previousBest, finalScore)
    try { localStorage.setItem('mdj-rdp-run-best', String(nextBest)) } catch { /* no storage */ }
    setBest(nextBest)
    if (!savedScoreRef.current) {
      savedScoreRef.current = true
      const playerName = getSessionName()
      if (playerName && finalScore > 0) {
        recordGameScore('rdp-run', playerName, finalScore)
        addXp(playerName, Math.max(10, Math.floor(finalScore / 30)))
      }
    }
  }, [])

  const begin = useCallback(() => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    savedScoreRef.current = false
    const initial: GameData = { playerY: GROUND_Y - PLAYER_H, velocityY: 0, obstacles: [], coins: [], distance: 0, coinCount: 0, coinPoints: 0, jumpsUsed: 0, speed: 315, obstacleTimer: 0.9, coinTimer: 1.4, lastTime: performance.now() }
    dataRef.current = initial
    statusRef.current = 'running'
    setStatus('running')
    setScore(0)
    setCoins(0)

    const frame = (now: number) => {
      const game = dataRef.current
      if (!game || statusRef.current !== 'running') return
      const dt = Math.min((now - game.lastTime) / 1000, .045)
      game.lastTime = now
      game.speed = Math.min(660, game.speed + dt * 5.5)
      game.distance += game.speed * dt
      game.velocityY += GRAVITY * dt
      game.playerY = Math.min(GROUND_Y - PLAYER_H, game.playerY + game.velocityY * dt)
      if (game.playerY >= GROUND_Y - PLAYER_H) {
        game.velocityY = 0
        game.jumpsUsed = 0
      }
      game.obstacleTimer -= dt
      game.coinTimer -= dt
      // On a narrow phone the canvas is shown as a left-aligned cropped view.
      // Spawn items closer to the cropped camera while keeping enough time to react.
      const spawnX = window.matchMedia('(max-width: 639px)').matches ? 600 : WIDTH + 35
      if (game.obstacleTimer <= 0) {
        const roll = Math.random()
        const kind = roll < .2 ? 'platform' : roll < .62 ? 'cone' : 'crate'
        const isPlatform = kind === 'platform'
        game.obstacles.push({ x: spawnX, width: isPlatform ? 118 : kind === 'cone' ? 32 : 47, height: isPlatform ? 76 : kind === 'cone' ? 48 : 54, kind })
        game.obstacleTimer = Math.max(.72, 1.55 - game.speed / 900) + Math.random() * .75
      }
      if (game.coinTimer <= 0) {
        const highValue = Math.random() < .35
        const count = highValue ? 2 : Math.random() > .55 ? 3 : 1
        const baseY = highValue ? GROUND_Y - 210 - Math.random() * 45 : GROUND_Y - 75 - Math.random() * 115
        for (let index = 0; index < count; index++) game.coins.push({ x: spawnX + index * 42, y: baseY - Math.sin(index * 1.25) * 22, collected: false, value: highValue ? 125 : 50, color: highValue ? '#29ABE2' : '#fbb040' })
        game.coinTimer = 1.6 + Math.random() * 1.3
      }
      game.obstacles.forEach(obstacle => { obstacle.x -= game.speed * dt })
      game.coins.forEach(coin => { coin.x -= game.speed * dt })
      game.obstacles = game.obstacles.filter(obstacle => obstacle.x + obstacle.width > -20)
      game.coins = game.coins.filter(coin => coin.x > -20 && !coin.collected)

      const playerX = getPlayerX() + 6
      const playerY = game.playerY + 7
      for (const obstacle of game.obstacles) {
        const obstacleTop = GROUND_Y - obstacle.height
        const playerBottom = playerY + PLAYER_H - 7
        const previousBottom = playerBottom - game.velocityY * dt
        if (obstacle.kind === 'platform' && game.velocityY >= 0 && previousBottom <= obstacleTop + 8 && playerBottom >= obstacleTop && overlaps(playerX, playerY, PLAYER_W - 10, PLAYER_H - 7, obstacle.x + 4, obstacleTop, obstacle.width - 8, obstacle.height)) {
          game.playerY = obstacleTop - PLAYER_H
          game.velocityY = 0
          game.jumpsUsed = 0
          continue
        }
        if (overlaps(playerX, playerY, PLAYER_W - 10, PLAYER_H - 7, obstacle.x + 4, GROUND_Y - obstacle.height + 3, obstacle.width - 8, obstacle.height - 3)) {
          const result = Math.floor(game.distance / 10) + game.coinPoints
          draw(game)
          finishGame(result)
          return
        }
      }
      for (const coin of game.coins) {
        if (!coin.collected && overlaps(playerX, playerY, PLAYER_W - 5, PLAYER_H - 8, coin.x - 13, coin.y - 13, 26, 26)) {
          coin.collected = true
          game.coinCount++
          game.coinPoints += coin.value
        }
      }
      const currentScore = Math.floor(game.distance / 10) + game.coinPoints
      setScore(currentScore)
      setCoins(game.coinCount)
      draw(game)
      animationRef.current = requestAnimationFrame(frame)
    }
    draw(initial)
    animationRef.current = requestAnimationFrame(frame)
  }, [draw, finishGame])

  const jump = useCallback(() => {
    const game = dataRef.current
    if (statusRef.current === 'intro' || statusRef.current === 'over') { begin(); return }
    if (game && game.jumpsUsed < 2) {
      game.velocityY = game.jumpsUsed === 0 ? JUMP_VELOCITY : JUMP_VELOCITY * .88
      game.jumpsUsed++
    }
  }, [begin])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') { event.preventDefault(); jump() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    }
  }, [jump])

  useEffect(() => {
    const initial: GameData = { playerY: GROUND_Y - PLAYER_H, velocityY: 0, obstacles: [], coins: [], distance: 0, coinCount: 0, coinPoints: 0, jumpsUsed: 0, speed: 315, obstacleTimer: 0, coinTimer: 0, lastTime: 0 }
    dataRef.current = initial
    draw(initial)
  }, [draw])

  return (
    <div className="min-h-screen bg-[#231F20] px-3 py-5 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 text-white sm:mb-5">
          <div><p className="text-[10px] font-black tracking-[.25em] text-[#FBB040] sm:text-xs">MDJ ARCADE</p><h1 className="text-3xl font-black italic sm:text-5xl">RDP <span className="text-[#F05063]">RUN</span></h1></div>
          <div className="flex items-end gap-3 text-right"><div><p className="text-[10px] text-white/60 sm:text-xs">SCORE</p><p className="text-xl font-black tabular-nums sm:text-2xl">{score}</p></div><div className="border-l border-white/20 pl-3"><p className="text-[10px] text-white/60 sm:text-xs">PIÈCES</p><p className="text-xl font-black tabular-nums text-[#FBB040] sm:text-2xl">× {coins}</p></div><button onClick={onExit} className="ml-1 min-h-10 rounded-xl border border-white/20 bg-white/10 px-3 text-xs font-bold text-white/80 transition-colors hover:bg-white/20 hover:text-white" aria-label="Quitter RDP Run">Quitter</button></div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-[#29ABE2] shadow-2xl">
          <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} onPointerDown={jump} className="block h-[75svh] min-h-[700px] w-full touch-manipulation object-cover object-left sm:h-auto sm:min-h-0 sm:object-contain" aria-label="RDP Run. Appuie pour sauter." />
          <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-[#231F20]/75 px-4 py-2 text-center text-xs font-bold text-white shadow-lg sm:hidden">
            Touchez l’écran pour sauter
          </div>
          {status !== 'running' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#231F20]/55 p-5 text-center backdrop-blur-[2px]">
              {status === 'intro' ? <div className="text-white"><p className="mb-2 text-sm font-bold tracking-[.2em] text-[#FBB040]">BIENVENUE À RDP</p><h2 className="text-4xl font-black sm:text-5xl">RDP RUN</h2><p className="mx-auto mt-3 max-w-sm text-white/80">Saute les obstacles, attrape les pièces et cours le plus loin possible.</p><button onClick={begin} className="mt-7 rounded-full bg-[#F05063] px-9 py-3 font-black text-white shadow-lg transition-transform hover:scale-105">JOUER</button><p className="mt-4 text-xs text-white/65">Tape l'écran ou appuie sur ESPACE pour sauter</p></div> : <div className="text-white"><p className="text-sm font-bold tracking-[.2em] text-[#FBB040]">FIN DE PARTIE</p><h2 className="mt-1 text-4xl font-black">GAME OVER</h2><p className="mt-4 text-xl">Score: <strong>{score}</strong></p><p className="text-white/70">Meilleur score: {best}</p><button onClick={begin} className="mt-6 rounded-full bg-[#F05063] px-8 py-3 font-black text-white shadow-lg transition-transform hover:scale-105">REJOUER</button></div>}
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-white/55 sm:mt-4 sm:text-sm">Mobile: touche l’écran pour sauter · Ordinateur: <kbd className="rounded bg-white/10 px-2 py-1 text-white/80">ESPACE</kbd> ou <kbd className="rounded bg-white/10 px-2 py-1 text-white/80">↑</kbd></p>
      </div>
    </div>
  )
}
