import type { BoardCell, GameSymbol } from '../lib/trikiLogic'
import ShareScore from './ShareScore'

const PINK = '#F05063'
const BLUE = '#29ABE2'
const YELLOW = '#FBB040'

interface BoardScreenProps {
  board: BoardCell[]
  currentPlayer: GameSymbol
  winner: GameSymbol | 'draw' | null
  winningLine: number[] | null
  scores: Record<GameSymbol, number>
  onCellClick: (index: number) => void
  onReplay: () => void
  onChangeMode: () => void
  playerName: string
  cumulativeScore: number
}

function TurnIndicator({ currentPlayer, winner }: { currentPlayer: GameSymbol; winner: GameSymbol | 'draw' | null }) {
  if (winner === 'draw') return <p className="text-center mb-6 text-white font-bold text-xl">Match nul! 🤝</p>
  if (winner) {
    return <p className="text-center mb-6 font-black text-2xl" style={{ color: winner === 'X' ? PINK : BLUE }}>{winner} a gagné! 🎉</p>
  }
  return <p className="text-center mb-6 font-bold text-lg" style={{ color: currentPlayer === 'X' ? PINK : BLUE }}>Tour de {currentPlayer}</p>
}

interface CellProps { value: BoardCell; position: number; isWinning: boolean; onClick: (i: number) => void }

function BoardCellItem({ value, position, isWinning, onClick }: CellProps) {
  const winStyle = isWinning ? ' border-2 border-[#FBB040]' : ''
  const winBg = isWinning ? 'bg-[#FBB040]/30' : 'bg-white/10 hover:bg-white/15'
  return (
    <div
      className={`aspect-square ${winBg} rounded-2xl flex items-center justify-center cursor-pointer transition-colors${winStyle}`}
      onClick={() => onClick(position)}
    >
      {value && <span className="font-black text-5xl" style={{ color: value === 'X' ? PINK : BLUE }}>{value}</span>}
    </div>
  )
}

export default function TrikiBoardScreen({ board, currentPlayer, winner, winningLine, scores, onCellClick, onReplay, onChangeMode, playerName, cumulativeScore }: BoardScreenProps) {
  return (
    <div className="bg-[#231F20] min-h-screen flex flex-col px-6 pt-8">
      <div className="flex justify-center gap-8 mb-6">
        <span>
          <span className="font-black text-2xl" style={{ color: PINK }}>X</span>
          <span className="text-white text-2xl ml-2">{scores.X}</span>
        </span>
        <span>
          <span className="font-black text-2xl" style={{ color: BLUE }}>O</span>
          <span className="text-white text-2xl ml-2">{scores.O}</span>
        </span>
      </div>
      <TurnIndicator currentPlayer={currentPlayer} winner={winner} />
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto w-full">
        {board.map((cell, index) => (
          <BoardCellItem
            key={`cell-${index}`}
            value={cell}
            position={index}
            isWinning={winningLine?.includes(index) ?? false}
            onClick={onCellClick}
          />
        ))}
      </div>
      {winner === 'X' && (
        <div className="mt-6 max-w-xs mx-auto w-full">
          <ShareScore playerName={playerName} score={cumulativeScore} gameName="Triki MDJ" />
        </div>
      )}
      <div className="flex flex-col gap-3 mt-4 max-w-xs mx-auto w-full pb-8">
        <button
          onClick={onReplay}
          className="w-full min-h-[56px] rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${PINK}, ${YELLOW})` }}
        >
          Rejouer
        </button>
        <button onClick={onChangeMode} className="text-white/40 text-sm hover:text-white/60 transition-colors text-center">
          Changer de mode
        </button>
      </div>
    </div>
  )
}
