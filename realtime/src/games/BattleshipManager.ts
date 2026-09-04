import type { BattleState } from '../../../shared/multiplayerProtocol.js'

const FLEET = [5, 4, 3, 3, 2]
type Game = { players: string[]; boards: Map<string, Set<number>>; shots: Map<string, Set<number>>; ready: Set<string>; turn?: string; winner?: string }

export class BattleshipError extends Error {}

export class BattleshipManager {
  private readonly games = new Map<string, Game>()

  prepare(roomCode: string, playerIds: string[], playerId: string): void {
    if (playerIds.length !== 2 || !playerIds.includes(playerId)) throw new BattleshipError('La salle doit avoir deux joueurs.')
    let game = this.games.get(roomCode)
    if (!game || game.players.join() !== playerIds.join()) {
      game = { players: playerIds, boards: new Map(), shots: new Map(), ready: new Set() }
      this.games.set(roomCode, game)
    }
    game.ready.add(playerId)
    if (!game.boards.has(playerId)) game.boards.set(playerId, randomFleet())
    if (game.ready.size === 2 && !game.turn) game.turn = game.players[Math.floor(Math.random() * 2)]
  }

  fire(roomCode: string, playerId: string, cell: number): { hit: boolean; winner?: string } {
    const game = this.requireGame(roomCode)
    if (!game.turn || game.turn !== playerId) throw new BattleshipError('Ce n’est pas ton tour.')
    const target = game.players.find(id => id !== playerId)
    if (!target) throw new BattleshipError('Adversaire introuvable.')
    const shots = game.shots.get(target) ?? new Set<number>()
    if (shots.has(cell)) throw new BattleshipError('Cette case a déjà été visée.')
    shots.add(cell); game.shots.set(target, shots)
    const hit = game.boards.get(target)?.has(cell) ?? false
    if ([...(game.boards.get(target) ?? [])].every(ship => shots.has(ship))) game.winner = playerId
    else game.turn = target
    return { hit, winner: game.winner }
  }

  state(roomCode: string, playerId: string): BattleState | undefined {
    const game = this.games.get(roomCode)
    if (!game || !game.players.includes(playerId)) return undefined
    const ownShots = game.shots.get(playerId) ?? new Set<number>()
    const ownBoard: Record<number, 'ship' | 'hit' | 'miss'> = {}
    for (const cell of game.boards.get(playerId) ?? []) ownBoard[cell] = ownShots.has(cell) ? 'hit' : 'ship'
    for (const cell of ownShots) if (!ownBoard[cell]) ownBoard[cell] = 'miss'
    const target = game.players.find(id => id !== playerId)!
    const targetBoard: Record<number, 'hit' | 'miss'> = {}
    for (const cell of game.shots.get(target) ?? []) targetBoard[cell] = (game.boards.get(playerId)?.has(cell) ?? false) ? 'hit' : 'miss'
    return { phase: game.winner ? 'finished' : game.turn ? 'playing' : 'placement', yourBoard: ownBoard, targetBoard, yourTurn: game.turn === playerId, yourFleetReady: game.ready.has(playerId), winnerId: game.winner }
  }

  hasGame(roomCode: string): boolean { return this.games.has(roomCode) }
  delete(roomCode: string): void { this.games.delete(roomCode) }
  private requireGame(roomCode: string): Game { const game = this.games.get(roomCode); if (!game) throw new BattleshipError('Place tes navires avant de jouer.'); return game }
}

function randomFleet(): Set<number> {
  const cells = new Set<number>()
  for (const length of FLEET) {
    let placed = false
    while (!placed) {
      const horizontal = Math.random() > .5
      const row = Math.floor(Math.random() * (horizontal ? 10 : 11 - length))
      const col = Math.floor(Math.random() * (horizontal ? 11 - length : 10))
      const candidate = Array.from({ length }, (_, i) => (horizontal ? row * 10 + col + i : (row + i) * 10 + col))
      if (candidate.every(cell => !cells.has(cell))) { candidate.forEach(cell => cells.add(cell)); placed = true }
    }
  }
  return cells
}
