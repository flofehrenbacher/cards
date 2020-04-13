import express from 'express'
import path from 'path'
import shuffle from 'shuffle-array'
import socketio, { Socket } from 'socket.io'
import { Card, CardName, Icon, Player } from './model/model'

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
let CARDS: Card[] = allIcons.flatMap(icon => {
  return allNames.map(name => ({ icon, name }))
})

io.on('connection', function (socket: Socket) {
  io.to(`${socket.id}`).emit('update users', USERS)

  socket.on('add user', (data: Player) => {
    const newUser = {
      name: data.name,
      id: socket.id,
    }
    USERS = [...USERS, newUser]
    io.emit('update users', USERS)
    io.to(`${socket.id}`).emit('assign id', newUser)
  })

  socket.on('remove user', (data: Player) => {
    USERS = USERS.filter(p => p.name !== data.name)
    io.emit('update users', USERS)
  })

  socket.on('reset users', () => {
    USERS = []
    io.emit('update users', USERS)
  })

  socket.on('give cards', () => {
    const mixedCards = shuffle(CARDS)
    USERS.forEach((u, userIndex) => {
      io.to(`${u.id}`).emit(
        'assign cards',
        mixedCards.filter((_, cardIndex) => cardIndex % USERS.length === userIndex),
      )
    })
  })

  socket.on('play card', ({ card }) => {
    io.emit('update stack', card)
  })
})

server.listen(3000, function () {
  console.log(`listening on http://localhost:${PORT}`)
})
