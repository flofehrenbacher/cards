import { Server } from 'socket.io'
import { CardType, Player } from '../model'

export function serverEmitToAll(io: Server, action: ServerToClientAction) {
  io.emit(action.event, action.payload)
}

export function serverEmitTo(io: Server, recipientId: string, action: ServerToClientAction) {
  io.to(recipientId).emit(action.event, action.payload)
}

export function clientListen<T extends ServerToClientAction>(
  // TODO types?????????
  { event, listener }: { event: T['event']; listener: (payload: T['payload']) => void },
) {
  // socket is implicit on client
  socket.on(event, listener)
}

type ServerToClientAction =
  | UpdateCardsAction
  | AssignMeAction
  | JoinGameAction
  | UpdatePlayersAction
  | UpdateStackAction

type UpdateCardsAction = {
  event: 'give-cards'
  payload: { cards: CardType[]; playerName?: string }
}
type AssignMeAction = { event: 'assign-me'; payload: { me: Player } }
type JoinGameAction = { event: 'join-game'; payload: { playerName?: string } }
type UpdatePlayersAction = { event: 'update-players'; payload: { players: Player[] } }
type UpdateStackAction = {
  event: 'update-stack'
  payload: { cards: CardType[]; playerName?: string }
}
