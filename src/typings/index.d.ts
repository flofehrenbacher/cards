import { Server } from 'socket.io'

declare global {
  const socket: Server
}
