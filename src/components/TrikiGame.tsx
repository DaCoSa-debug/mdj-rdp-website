import { useState, useEffect } from 'react'
import { addPoints, getTopRanking, getSessionName } from '../lib/arcadeScores'
import { checkWinner, getAiMove } from '../lib/trikiLogic'
import type { BoardCell, GameSymbol, Difficulty } from '../lib/trikiLogic'
import TrikiModeScreen from './TrikiModeScreen'
import TrikiBoardScreen from './TrikiBoardScreen'

type Mode = 'friend' | 'ai'
type WinState = GameSymbol | 'draw' | null

const EMPTY_BOARD: BoardCell[] = Array(9).fill(null)

function loadCumulativeScore(name: string): number {
  if (!name) return 0
  const entry = getTopRanking(100).find(s => s.name === name)
  return entry?.totalScore ?? 0
}

export default function TrikiGame() {
  const [board, setBoard] = useState<BoardCell[]>([...EMPTY_BOARD])
  const [currentPlayer, setCurrentPlayer] = useState<GameSymbol>('X')
  const [winner, setWinner] = useState<WinState>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('facile')
  const [scores, setScores] = useState<Record<GameSymbol, number>>({ X: 0, O: 0 })
  const [playerName] = useState<string>(getSessionName)
  const [cumulativeWins, setCumulativeWins] = useState<number>(0)

  useEffect(() => {
    setCumulativeWins(loadCumulativeScore(playerName))
    return () => undefined
  }, [playerName])

  useEffect(() => {
    if (mode !== 'ai' || currentPlayer !== 'O' || winner !== null) return () => undefined
    const timer = setTimeout(() => triggerAiMove(), 600)
    return () => clearTimeout(timer)
  }, [mode, currentPlayer, winner, board, difficulty])

  function persistWin(): void {
    setCumulativeWins(w => w + 1)
    addPoints(playerName || 'Anonyme', 1)
  }

  function applyMove(newBoard: BoardCell[], player: GameSymbol): void {
    setBoard(newBoard)
    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine([...result.line])
      setScores(s => ({ ...s, [result.winner]: s[result.winner] + 1 }))
      if (result.winner === 'X') persistWin()
      return
    }
    if (newBoard.every(Boolean)) { setWinner('draw'); return }
    setCurrentPlayer(player === 'X' ? 'O' : 'X')
  }

  function handleCellClick(index: number): void {
    if (board[index] || winner) return
    if (mode === 'ai' && currentPlayer === 'O') return
    const newBoard = [...board] as BoardCell[]
    newBoard[index] = currentPlayer
    applyMove(newBoard, currentPlayer)
  }

  function triggerAiMove(): void {
    const move = getAiMove(board, difficulty)
    if (move === undefined) return
    const newBoard = [...board] as BoardCell[]
    newBoard[move] = 'O'
    applyMove(newBoard, 'O')
  }

  function resetBoard(): void {
    setBoard([...EMPTY_BOARD])
    setWinner(null)
    setWinningLine(null)
    setCurrentPlayer('X')
  }

  function handleChangeMode(): void {
    resetBoard()
    setScores({ X: 0, O: 0 })
    setMode(null)
  }

  function handleSelectAi(selectedDifficulty: Difficulty): void {
    setDifficulty(selectedDifficulty)
    setMode('ai')
    resetBoard()
  }

  if (!mode) return (
    <TrikiModeScreen
      onSelectMode={m => { setMode(m); resetBoard() }}
      onSelectAi={handleSelectAi}
    />
  )

  return (
    <TrikiBoardScreen
      board={board}
      currentPlayer={currentPlayer}
      winner={winner}
      winningLine={winningLine}
      scores={scores}
      onCellClick={handleCellClick}
      onReplay={resetBoard}
      onChangeMode={handleChangeMode}
      playerName={playerName}
      cumulativeScore={cumulativeWins}
    />
  )
}
