import { useCallback, useEffect, useRef, useState } from 'react'
import { addXp, getPlayerGameScore, getSessionName, recordGameScore } from '../lib/arcadeScores'

const SIZE = 20
const BOARD = 480
const CELL = BOARD / SIZE

type GameStatus = 'intro' | 'running' | 'over'
type Direction = 'up' | 'down' | 'left' | 'right'
type Difficulty = 'facile' | 'moyen' | 'difficile' | 'extreme'
interface Cell { x: number; y: number }
interface SnakeData { body: Cell[]; food: Cell; direction: Direction; nextDirection: Direction }

const OPPOSITE: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' }
const DIFFICULTIES: Record<Difficulty, { label: string; delay: number; description: string; color: string }> = {
  facile: { label: 'Facile', delay: 195, description: 'Pour découvrir le jeu', color: '#8DC63F' },
  moyen: { label: 'Moyen', delay: 145, description: 'Le rythme classique', color: '#FBB040' },
  difficile: { label: 'Difficile', delay: 105, description: 'Pour les rapides', color: '#F7941E' },
  extreme: { label: 'Extrême', delay: 75, description: 'Réservé aux experts', color: '#F05063' },
}

function createFood(body: Cell[]): Cell {
  const free: Cell[] = []
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    if (!body.some(part => part.x === x && part.y === y)) free.push({ x, y })
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 2, y: 2 }
}

function freshGame(): SnakeData {
  const body = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }]
  return { body, food: createFood(body), direction: 'right', nextDirection: 'right' }
}

export default function SnakeGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<SnakeData>(freshGame())
  const difficultyRef = useRef<Difficulty>('moyen')
  const [status, setStatus] = useState<GameStatus>('intro')
  const [difficulty, setDifficulty] = useState<Difficulty>('moyen')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => getPlayerGameScore('snake', getSessionName()))
  const touchStart = useRef<Cell | null>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context) return
    const game = gameRef.current
    const boardColor = DIFFICULTIES[difficultyRef.current].color
    context.fillStyle = boardColor
    context.fillRect(0, 0, BOARD, BOARD)
    context.strokeStyle = 'rgba(15, 40, 10, .14)'
    context.lineWidth = 1
    for (let line = 0; line <= SIZE; line++) {
      context.beginPath(); context.moveTo(line * CELL, 0); context.lineTo(line * CELL, BOARD); context.stroke()
      context.beginPath(); context.moveTo(0, line * CELL); context.lineTo(BOARD, line * CELL); context.stroke()
    }
    context.fillStyle = '#0f380f'
    context.fillRect(game.food.x * CELL + 5, game.food.y * CELL + 5, CELL - 10, CELL - 10)
    game.body.forEach((part, index) => {
      context.fillStyle = index === 0 ? '#071d07' : '#0f380f'
      context.fillRect(part.x * CELL + 2, part.y * CELL + 2, CELL - 4, CELL - 4)
    })
    const head = game.body[0]
    context.fillStyle = boardColor
    const eyeOffset = game.direction === 'left' ? 5 : game.direction === 'right' ? CELL - 9 : CELL / 2 - 2
    const eyeY = game.direction === 'up' ? 5 : game.direction === 'down' ? CELL - 9 : CELL / 2 - 2
    context.fillRect(head.x * CELL + eyeOffset, head.y * CELL + eyeY, 4, 4)
  }, [])

  const finish = useCallback((finalScore: number) => {
    const name = getSessionName()
    if (name && finalScore > 0) {
      recordGameScore('snake', name, finalScore)
      addXp(name, Math.max(5, finalScore * 5))
      setBest(Math.max(best, finalScore))
    }
    setStatus('over')
  }, [best])

  const move = useCallback(() => {
    const game = gameRef.current
    game.direction = game.nextDirection
    const head = { ...game.body[0] }
    if (game.direction === 'up') head.y--
    if (game.direction === 'down') head.y++
    if (game.direction === 'left') head.x--
    if (game.direction === 'right') head.x++
    const hitWall = head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE
    const hitSelf = game.body.some(part => part.x === head.x && part.y === head.y)
    if (hitWall || hitSelf) { finish(game.body.length - 3); return }
    game.body.unshift(head)
    if (head.x === game.food.x && head.y === game.food.y) {
      setScore(game.body.length - 3)
      game.food = createFood(game.body)
    } else game.body.pop()
    draw()
  }, [draw, finish])

  const start = useCallback((selectedDifficulty = difficulty) => {
    gameRef.current = freshGame()
    difficultyRef.current = selectedDifficulty
    setDifficulty(selectedDifficulty)
    setScore(0)
    setStatus('running')
    requestAnimationFrame(draw)
  }, [difficulty, draw])

  const setDirection = useCallback((direction: Direction) => {
    if (status !== 'running') return
    const game = gameRef.current
    if (OPPOSITE[game.direction] !== direction) game.nextDirection = direction
  }, [status])

  useEffect(() => { draw() }, [draw])

  useEffect(() => {
    if (status !== 'running') return
    const delay = Math.max(60, DIFFICULTIES[difficulty].delay - score * 3)
    const timer = window.setInterval(move, delay)
    return () => window.clearInterval(timer)
  }, [difficulty, move, score, status])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const keyMap: Record<string, Direction | undefined> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' }
      const direction = keyMap[event.key]
      if (direction) { event.preventDefault(); setDirection(direction) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setDirection])

  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void { touchStart.current = { x: event.clientX, y: event.clientY } }
  function onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    const startPoint = touchStart.current
    if (!startPoint) return
    const dx = event.clientX - startPoint.x
    const dy = event.clientY - startPoint.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return
    setDirection(Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up')
    touchStart.current = null
  }

  const dPad = (direction: Direction, label: string, className = '') => <button key={direction} onPointerDown={event => { event.preventDefault(); setDirection(direction) }} className={`flex h-[84px] w-[84px] touch-manipulation items-center justify-center border-[3px] border-[#0f380f] bg-[#8bac0f] text-4xl font-black text-[#0f380f] active:bg-[#0f380f] active:text-[#9bbc0f] ${className}`} aria-label={label}>{label}</button>

  return (
    <div className="min-h-screen bg-[#231F20] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex items-end justify-between gap-3 text-white">
          <div><p className="text-xs font-black tracking-[.22em] text-[#9bbc0f]">MDJ ARCADE</p><h1 className="text-4xl font-black">SNAKE <span className="text-[#9bbc0f]">MDJ</span></h1></div>
          <div className="flex items-end gap-3"><div className="text-right"><p className="text-[10px] font-bold tracking-widest" style={{ color: DIFFICULTIES[difficulty].color }}>{DIFFICULTIES[difficulty].label.toUpperCase()} · SCORE</p><p className="text-2xl font-black tabular-nums">{score}</p></div><button onClick={onExit} className="min-h-10 rounded-xl border border-white/20 bg-white/10 px-3 text-xs font-bold text-white/80 hover:bg-white/20">Quitter</button></div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border-[10px] border-[#0f380f] shadow-2xl shadow-black/40" style={{ background: DIFFICULTIES[difficulty].color }}>
          <canvas ref={canvasRef} width={BOARD} height={BOARD} onPointerDown={onPointerDown} onPointerUp={onPointerUp} className="block w-full touch-none" aria-label="Snake MDJ. Glisse dans une direction pour jouer." />
          {status !== 'running' && <div className="absolute inset-0 flex items-center justify-center bg-[#0f380f]/80 p-6 text-center text-[#9bbc0f]">
            {status === 'intro' ? <div><p className="font-mono text-sm font-bold tracking-[.2em]">SNAKE MDJ</p><h2 className="mt-2 font-mono text-3xl font-black">CHOISIS TON NIVEAU</h2><p className="mt-3 text-sm text-[#9bbc0f]/80">Glisse sur l’écran ou utilise les flèches.</p><div className="mt-5 grid gap-2">{(Object.entries(DIFFICULTIES) as Array<[Difficulty, typeof DIFFICULTIES[Difficulty]]>).map(([key, level]) => <button key={key} onClick={() => start(key)} className="border-2 px-5 py-2 text-left font-mono transition-transform hover:scale-[1.02]" style={{ borderColor: level.color, color: level.color }}><strong>{level.label.toUpperCase()}</strong> <span className="text-xs text-[#9bbc0f]/75">— {level.description}</span></button>)}</div></div> : <div><p className="font-mono text-sm font-bold tracking-[.2em]">FIN DE PARTIE</p><h2 className="mt-2 font-mono text-3xl font-black">GAME OVER</h2><p className="mt-4 font-mono text-xl">Score : {score}</p><p className="mt-1 text-sm text-[#9bbc0f]/75">Meilleur score : {best}</p><button onClick={() => start()} className="mt-6 border-2 border-[#9bbc0f] bg-[#9bbc0f] px-7 py-3 font-mono font-black text-[#0f380f] hover:bg-transparent hover:text-[#9bbc0f]">REJOUER</button><button onClick={() => setStatus('intro')} className="mt-3 block w-full text-xs font-bold text-[#9bbc0f]/65 underline underline-offset-4">Changer de niveau</button></div>}
          </div>}
        </div>
        <div className="mx-auto mt-5 grid w-[252px] grid-cols-3 gap-0 sm:hidden">
          <span />{dPad('up', '↑')}<span />
          {dPad('left', '←')}{dPad('down', '↓')}{dPad('right', '→')}
        </div>
        <p className="mt-5 text-center text-xs text-white/50">Mobile : glisse sur l’écran · Ordinateur : flèches ou WASD</p>
      </div>
    </div>
  )
}
