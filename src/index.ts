import express from 'express'
import socketio, { Socket } from 'socket.io'
import path from 'path'

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
// let CARDS = Array.from({ length: 12 }).map((_, i) => i + 1)

io.on('connection', function (socket: Socket) {
  console.log(socket.id)
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
    console.log('reset users')
    USERS = []
    io.emit('update users', USERS)
  })

  // socket.on('give cards', () => {
  //   console.log('test')
  //   USERS.map((u) => console.log(u.id))
  //   // io.emit('')
  // })
})

server.listen(3000, function () {
  console.log(`listening on http://localhost:${PORT}`)
})
