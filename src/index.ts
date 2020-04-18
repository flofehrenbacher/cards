import express from 'express'
import path from 'path'
import socketio from 'socket.io'
import { serverListen } from './socket-io/client-to-server'

const PORT = process.env.PORT || 3000

const app = express()
app.set('port', PORT)

let server = require('http').Server(app)
let io = socketio(server, { serveClient: false })
serverListen(io)

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

server.listen(3000, function () {
  console.log(`listening on http://localhost:${PORT}`)
})
