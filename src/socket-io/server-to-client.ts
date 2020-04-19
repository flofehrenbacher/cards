import { Server } from 'socket.io'
import { CardType, Player } from '../model'
import * as H from 'history'
import { AppStateAction } from '../gui/app-state'
import { UnreachableCaseError } from '../utils/unreachable-case-error'

export function serverEmitToAll(io: Server, action: ServerToClientAction) {
  io.emit('public-event', action)
}

export function serverEmitTo(io: Server, recipientId: string, action: ServerToClientAction) {
  io.to(recipientId).emit('public-event', action)
}

export function clientListen(
  history: H.History<H.LocationState>,
  dispatch: React.Dispatch<AppStateAction>,
) {
  // socket is implicit on client
  socket.on('public-event', (action: ServerToClientAction) => {
    switch (action.type) {
      case 'update-players': {
        dispatch({ type: 'update-players', payload: action.payload.players })
        return
      }
      case 'assign-me': {
        dispatch({ type: 'assign-me', payload: action.payload.me })
        return
      }
      case 'give-cards': {
        history.push('/game')
        dispatch({ type: 'give-cards', payload: action.payload })
        return
      }
      case 'update-stack': {
        dispatch({ type: 'update-stack', payload: action.payload })
        return
      }
      case 'took-trick': {
        dispatch({ type: 'took-trick', payload: action.payload })
        return
      }
      default:
        throw new UnreachableCaseError(action)
    }
  })
}

type ServerToClientAction =
  | UpdateCardsAction
  | AssignMeAction
  | UpdatePlayersAction
  | UpdateStackAction
  | TookTrickAction

type UpdateCardsAction = {
  type: 'give-cards'
  payload: { cards: CardType[]; playerName: string }
}
type AssignMeAction = { type: 'assign-me'; payload: { me: Player } }
type UpdatePlayersAction = { type: 'update-players'; payload: { players: Player[] } }
type UpdateStackAction = {
  type: 'update-stack'
  payload: { cards: CardType[]; playerName: string }
}
type TookTrickAction = {
  type: 'took-trick'
  payload: { cards: CardType[]; player: Player }
}
