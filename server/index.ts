import app from './config/express'
import config from './config/config'
import mongoose from "./config/mongoose";
import http from 'http'
import { Server } from "socket.io";
import swap from "./socket/swap";

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  swap(socket, io)
})

server.listen(config.port, () => {
  console.info(`API started on port ${config.port}`)
})

mongoose()

export default server
