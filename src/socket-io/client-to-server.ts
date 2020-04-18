import shuffle from 'shuffle-array'
import { Server, Socket } from 'socket.io'
import { CardName, CardType, Icon, Player } from '../model'
import { UnreachableCaseError } from '../utils/unreachable-case-error'
import { serverEmitTo, serverEmitToAll } from './server-to-client'

export function clientEmit(action: ClientToServerAction) {
  // implicit socket on client
  socket.emit('public-event', action)
}

const allIcons: Icon[] = ['eichel', 'blatt', 'herz', 'schelle']
const allNames: CardName[] = ['A', 'K', 'O', 'U', '10', '9']

let USERS: Player[] = []
let CARDS: CardType[] = allIcons.flatMap(icon => {
  return allNames.map(name => ({ icon, name }))
})

export function serverListen(io: Server) {
  io.on('connection', function (socket: Socket) {
    serverEmitTo(io, socket.id, { type: 'update-players', payload: { players: USERS } })

    socket.on('public-event', (action: ClientToServerAction) => {
      switch (action.type) {
        case 'give-cards': {
          return giveCards(action.payload.playerName ?? 'unknown player', io)
        }
        case 'add-player': {
          const player = {
            name: action.payload.name,
            id: socket.id,
          }
          return addPlayer(player, io)
        }
        case 'update-stack': {
          return serverEmitToAll(io, {
            type: 'update-stack',
            payload: { cards: action.payload.cards, playerName: action.payload.playerName },
          })
        }
        default:
          throw new UnreachableCaseError(action)
      }
    })
  })
}

function addPlayer(player: Player, io: Server) {
  USERS = [...USERS, player]
  serverEmitToAll(io, { type: 'update-players', payload: { players: USERS } })
  serverEmitTo(io, player.id, { type: 'assign-me', payload: { me: player } })
}

function giveCards(playerName: string, io: Server) {
  const mixedCards = shuffle(CARDS)
  USERS.forEach((u, userIndex) => {
    serverEmitTo(io, u.id, {
      type: 'give-cards',
      payload: {
        cards: mixedCards.filter((_, cardIndex) => cardIndex % USERS.length === userIndex),
        playerName,
      },
    })
  })
}

type ClientToServerAction = GiveCardsAction | AddPlayerAction | UpdateStackAction

type GiveCardsAction = { type: 'give-cards'; payload: { playerName?: string } }
type AddPlayerAction = { type: 'add-player'; payload: { name: string } }
type UpdateStackAction = {
  type: 'update-stack'
  payload: { cards: CardType[]; playerName?: string }
}
