import express from 'express'
import socketio, { Socket } from 'socket.io'
import path from 'path'
import shuffle from 'shuffle-array'

const PORT = process.env.PORT || 3000

const app = express()
app.set('port', PORT)

let server = require('http').Server(app)
let io = socketio(server)

const guiPath = process.env.NODE_ENV === 'production' ? './gui' : '../build/gui'

app.use(express.static(path.join(__dirname, guiPath)))

export type User = {
  name: string
  id: string
}

let USERS: User[] = []
let CARDS = Array.from({ length: 32 }).map((_, i) => i + 1)

io.on('connection', function (socket: Socket) {
  io.to(`${socket.id}`).emit('update users', USERS)

  socket.on('add user', (data: User) => {
    const newUser = {
      name: data.name,
      id: socket.id,
    }
    USERS = [...USERS, newUser]
    io.emit('update users', USERS)
    io.to(`${socket.id}`).emit('assign id', newUser)
  })

  socket.on('remove user', (data: User) => {
    USERS = USERS.filter((p) => p.name !== data.name)
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
