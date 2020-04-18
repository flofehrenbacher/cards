import express from 'express'
import path from 'path'
import shuffle from 'shuffle-array'
import socketio, { Socket } from 'socket.io'
import { CardName, CardType, Icon, Player } from './model/model'
import { serverListen } from './socket-io/client-to-server'
import { serverEmitTo, serverEmitToAll } from './socket-io/server-to-client'

const PORT = process.env.PORT || 3000

const app = express()
app.set('port', PORT)

let server = require('http').Server(app)
let io = socketio(server, { serveClient: false })

const guiPath =
  process.env.NODE_ENV === 'production' ? './gui' : path.join(__dirname, '../build/gui')

const assetsPath =
  process.env.NODE_ENV === 'production' ? './assets' : path.join(__dirname, '../assets')

const publicPath =
  process.env.NODE_ENV === 'production' ? './public' : path.join(__dirname, '../public')

app.use(express.static(guiPath))
app.use('/players', express.static(guiPath))
app.use('/game', express.static(guiPath))

app.use('/assets', express.static(assetsPath))
app.use('/public', express.static(publicPath))

const allIcons: Icon[] = ['eichel', 'blatt', 'herz', 'schelle']
const allNames: CardName[] = ['A', 'K', 'O', 'U', '10', '9']

let USERS: Player[] = []
let CARDS: CardType[] = allIcons.flatMap(icon => {
  return allNames.map(name => ({ icon, name }))
})

io.on('connection', function (socket: Socket) {
  serverEmitTo(io, socket.id, { event: 'update-players', payload: { players: USERS } })

  serverListen(socket, {
    event: 'add-player',
    // TODO types?????????
    listener: ({ name }: { name: string }) => {
      const newUser: Player = {
        name: name,
        id: socket.id,
      }
      USERS = [...USERS, newUser]
      serverEmitToAll(io, { event: 'update-players', payload: { players: USERS } })
      serverEmitTo(io, socket.id, { event: 'assign-me', payload: { me: newUser } })
    },
  })

  serverListen(socket, {
    event: 'give-cards',
    listener: ({ playerName }: { playerName?: string }) => {
      const mixedCards = shuffle(CARDS)
      USERS.forEach((u, userIndex) => {
        serverEmitTo(io, u.id, {
          event: 'give-cards',
          payload: {
            cards: mixedCards.filter((_, cardIndex) => cardIndex % USERS.length === userIndex),
            playerName,
          },
        })
      })
    },
  })

  serverListen(socket, {
    event: 'update-stack',
    listener: ({ cards, playerName }: { cards: CardType[]; playerName: string }) => {
      serverEmitToAll(io, { event: 'update-stack', payload: { cards, playerName } })
    },
  })
})

server.listen(3000, function () {
  console.log(`listening on http://localhost:${PORT}`)
})
