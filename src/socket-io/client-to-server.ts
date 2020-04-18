import { CardType } from '../model'
import { Socket } from 'socket.io'

export function clientEmit(action: ClientToServerAction) {
  // implicit socket on client
  socket.emit(action.event, action.payload)
}

// the socket on the server is not implicit
export function serverListen<T extends ClientToServerAction>(
  ssocket: Socket,
  // TODO types?????????
  { event, listener }: { event: T['event']; listener: (payload: T['payload']) => void },
) {
  ssocket.on(event, listener)
}

type ClientToServerAction =
  | GiveCardsAction
  | PlayCardAction
  | JoinGameAction
  | AddPlayerAction
  | UpdateStackAction

type GiveCardsAction = { event: 'give-cards'; payload: { playerName?: string } }
type PlayCardAction = { event: 'play-card'; payload: { card: CardType; playerName?: string } }
type JoinGameAction = { event: 'join-game'; payload: { playerName?: string } }
type AddPlayerAction = { event: 'add-player'; payload: { name: string } }
type UpdateStackAction = {
  event: 'update-stack'
  payload: { cards: CardType[]; playerName?: string }
}
