export type BoardCell = 'X' | 'O' | null
export type GameSymbol = 'X' | 'O'

export interface WinResult {
  winner: GameSymbol
  line: readonly [number, number, number]
}

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const

export function checkWinner(board: BoardCell[]): WinResult | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as GameSymbol, line }
    }
  }
  return null
}

function findWinningMove(board: BoardCell[], player: GameSymbol): number | null {
  for (const line of WINNING_LINES) {
    const cells = Array.from(line) as number[]
    const playerCount = cells.filter(i => board[i] === player).length
    const emptyCell = cells.find(i => board[i] === null)
    if (playerCount === 2 && emptyCell !== undefined) return emptyCell
  }
  return null
}

function emptyIndices(board: BoardCell[]): number[] {
  return board.flatMap((cell, i) => (cell === null ? [i] : []))
}

function randomFrom(arr: number[]): number {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getBestAiMove(board: BoardCell[]): number | undefined {
  const win = findWinningMove(board, 'O')
  if (win !== null) return win
  const block = findWinningMove(board, 'X')
  if (block !== null) return block
  if (board[4] === null) return 4
  const corners = [0, 2, 6, 8].filter(i => board[i] === null)
  if (corners.length) return randomFrom(corners)
  const empty = emptyIndices(board)
  return empty.length ? randomFrom(empty) : undefined
}
