import express from 'express'
import socketio, { Server } from 'socket.io'
import path from 'path'

const PORT = process.env.PORT || 3000

const app = express()
app.set('port', PORT)

let server = require('http').Server(app)
let io = socketio(server)

const guiPath = process.env.NODE_ENV === 'production' ? './gui' : '../build/gui'

app.use(express.static(path.join(__dirname, guiPath)))

io.on('connection', function (socket: Server) {
  console.log('a user connected')
  socket.on('add user', (data: any) => console.log('add USER', data))
})

server.listen(3000, function () {
  console.log(`listening on http://localhost:${PORT}`)
})
