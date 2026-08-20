import { useEffect, useRef, useState } from 'react'
import { addXp, getPlayerGameScore, getSessionName, recordGameScore } from '../lib/arcadeScores'

const COLS = 8
const ROWS = 14
const CELL = 36
const WIDTH = COLS * CELL
const HEIGHT = ROWS * CELL
const COLORS = ['#FBB040', '#F05063', '#29ABE2', '#8DC63F', '#F7941E']

type GameStatus = 'intro' | 'running' | 'over'
interface Point { x: number; y: number }
interface BoardBlock extends Point { color: string }
interface Piece { shape: Point[]; x: number; y: number; color: string }
interface Game { board: BoardBlock[]; active: Piece }

// Original RDP tile set: short street segments and corner pieces, not branded tetrominoes.
const TILE_SHAPES: Point[][] = [
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }],
]

function randomPiece(): Piece {
  const shape = TILE_SHAPES[Math.floor(Math.random() * TILE_SHAPES.length)]
  return { shape, x: 3, y: 0, color: COLORS[Math.floor(Math.random() * COLORS.length)] }
}

function freshGame(): Game { return { board: [], active: randomPiece() } }

function canPlace(piece: Piece, board: BoardBlock[], x = piece.x, y = piece.y, shape = piece.shape): boolean {
  return shape.every(cell => {
    const px = x + cell.x
    const py = y + cell.y
    return px >= 0 && px < COLS && py >= 0 && py < ROWS && !board.some(block => block.x === px && block.y === py)
  })
}

function rotate(shape: Point[]): Point[] {
  const turned = shape.map(cell => ({ x: -cell.y, y: cell.x }))
  const minX = Math.min(...turned.map(cell => cell.x))
  const minY = Math.min(...turned.map(cell => cell.y))
  return turned.map(cell => ({ x: cell.x - minX, y: cell.y - minY }))
}

export default function RdpBlocsGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game>(freshGame())
  const statusRef = useRef<GameStatus>('intro')
  const scoreRef = useRef(0)
  const [status, setStatus] = useState<GameStatus>('intro')
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [best, setBest] = useState(() => getPlayerGameScore('rdp-blocs', getSessionName()))

  function draw(): void {
    const context = canvasRef.current?.getContext('2d')
    if (!context) return
    const game = gameRef.current
    context.fillStyle = '#18222c'
    context.fillRect(0, 0, WIDTH, HEIGHT)
    context.strokeStyle = 'rgba(255,255,255,.07)'
    context.lineWidth = 1
    for (let x = 0; x <= COLS; x++) { context.beginPath(); context.moveTo(x * CELL, 0); context.lineTo(x * CELL, HEIGHT); context.stroke() }
    for (let y = 0; y <= ROWS; y++) { context.beginPath(); context.moveTo(0, y * CELL); context.lineTo(WIDTH, y * CELL); context.stroke() }
    const paint = (block: BoardBlock) => {
      context.fillStyle = block.color
      context.fillRect(block.x * CELL + 3, block.y * CELL + 3, CELL - 6, CELL - 6)
      context.fillStyle = 'rgba(255,255,255,.25)'
      context.fillRect(block.x * CELL + 7, block.y * CELL + 7, CELL - 14, 5)
    }
    game.board.forEach(paint)
    game.active.shape.forEach(cell => paint({ x: game.active.x + cell.x, y: game.active.y + cell.y, color: game.active.color }))
  }

  function finish(): void {
    const finalScore = scoreRef.current
    const name = getSessionName()
    if (name && finalScore > 0) {
      recordGameScore('rdp-blocs', name, finalScore)
      addXp(name, Math.max(10, Math.floor(finalScore / 10)))
      setBest(previous => Math.max(previous, finalScore))
    }
    statusRef.current = 'over'
    setStatus('over')
  }

  function spawn(): void {
    const active = randomPiece()
    if (!canPlace(active, gameRef.current.board)) { finish(); return }
    gameRef.current.active = active
  }

  function lockPiece(): void {
    const game = gameRef.current
    game.active.shape.forEach(cell => game.board.push({ x: game.active.x + cell.x, y: game.active.y + cell.y, color: game.active.color }))
    const cleared = Array.from({ length: ROWS }, (_, y) => y).filter(y => game.board.filter(block => block.y === y).length === COLS)
    if (cleared.length) {
      game.board = game.board.filter(block => !cleared.includes(block.y)).map(block => ({ ...block, y: block.y + cleared.filter(row => row > block.y).length }))
      const gained = cleared.length * cleared.length * 100
      scoreRef.current += gained
      setScore(scoreRef.current)
      setLines(current => current + cleared.length)
    }
    spawn()
    draw()
  }

  function moveDown(): void {
    const game = gameRef.current
    if (canPlace(game.active, game.board, game.active.x, game.active.y + 1)) { game.active.y++; draw() }
    else lockPiece()
  }

  function move(dx: number): void {
    if (statusRef.current !== 'running') return
    const game = gameRef.current
    if (canPlace(game.active, game.board, game.active.x + dx, game.active.y)) { game.active.x += dx; draw() }
  }

  function turn(): void {
    if (statusRef.current !== 'running') return
    const game = gameRef.current
    const shape = rotate(game.active.shape)
    if (canPlace(game.active, game.board, game.active.x, game.active.y, shape)) { game.active.shape = shape; draw() }
  }

  function drop(): void {
    if (statusRef.current !== 'running') return
    const game = gameRef.current
    while (canPlace(game.active, game.board, game.active.x, game.active.y + 1)) game.active.y++
    lockPiece()
  }

  function start(): void {
    gameRef.current = freshGame()
    scoreRef.current = 0
    setScore(0)
    setLines(0)
    statusRef.current = 'running'
    setStatus('running')
    requestAnimationFrame(draw)
  }

  useEffect(() => { draw() }, [])
  useEffect(() => {
    if (status !== 'running') return
    const timer = window.setInterval(moveDown, Math.max(260, 760 - lines * 22))
    return () => window.clearInterval(timer)
  }, [lines, status])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const actions: Record<string, () => void> = { ArrowLeft: () => move(-1), ArrowRight: () => move(1), ArrowUp: turn, ArrowDown: moveDown, ' ': drop }
      const action = actions[event.key]
      if (action) { event.preventDefault(); action() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const control = (label: string, action: () => void, wide = false) => <button onPointerDown={event => { event.preventDefault(); action() }} className={`${wide ? 'col-span-2' : ''} min-h-[72px] touch-manipulation rounded-2xl border-2 border-[#FBB040] bg-[#FBB040]/15 px-4 text-2xl font-black text-[#FBB040] active:bg-[#FBB040] active:text-[#231F20]`} aria-label={label}>{label}</button>

  return (
    <div className="min-h-screen bg-[#231F20] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-sm">
        <div className="mb-4 flex items-end justify-between gap-3 text-white"><div><p className="text-xs font-black tracking-[.22em] text-[#FBB040]">MDJ ARCADE</p><h1 className="text-4xl font-black">RDP <span className="text-[#FBB040]">BLOCS</span></h1></div><button onClick={onExit} className="min-h-10 rounded-xl border border-white/20 bg-white/10 px-3 text-xs font-bold text-white/80 hover:bg-white/20">Quitter</button></div>
        <div className="mb-3 flex justify-between rounded-2xl bg-white/5 px-5 py-3 text-white"><span><small className="block text-[10px] font-bold tracking-widest text-white/45">SCORE</small><strong className="text-xl">{score}</strong></span><span className="text-right"><small className="block text-[10px] font-bold tracking-widest text-white/45">LIGNES</small><strong className="text-xl text-[#FBB040]">{lines}</strong></span></div>
        <div className="relative overflow-hidden rounded-3xl border-4 border-[#FBB040] bg-[#18222c] shadow-2xl"><canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="block w-full" aria-label="RDP Blocs" />
          {status !== 'running' && <div className="absolute inset-0 flex items-center justify-center bg-[#18222c]/90 p-6 text-center text-white">{status === 'intro' ? <div><p className="text-xs font-black tracking-[.2em] text-[#FBB040]">PUZZLE RÉTRO</p><h2 className="mt-2 text-4xl font-black">RDP BLOCS</h2><p className="mt-3 text-sm text-white/65">Assemble les tuiles et complète les lignes du quartier.</p><button onClick={start} className="mt-6 rounded-full bg-[#FBB040] px-8 py-3 font-black text-[#231F20]">JOUER</button></div> : <div><p className="text-xs font-black tracking-[.2em] text-[#F05063]">FIN DE PARTIE</p><h2 className="mt-2 text-4xl font-black">GAME OVER</h2><p className="mt-4 text-xl">Score : <strong>{score}</strong></p><p className="text-sm text-white/60">Meilleur score : {best}</p><button onClick={start} className="mt-6 rounded-full bg-[#FBB040] px-8 py-3 font-black text-[#231F20]">REJOUER</button></div>}</div>}
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2 sm:hidden"><span />{control('↻', turn)}<span /><span />{control('←', () => move(-1))}{control('→', () => move(1))}<span />{control('▼', moveDown)}{control('⤓', drop, true)}<span /></div>
        <p className="mt-4 text-center text-xs text-white/50">Mobile : boutons tactiles · Ordinateur : flèches, ↑ tourne et espace descend.</p>
      </div>
    </div>
  )
}
