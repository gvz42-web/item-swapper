import {Server, Socket} from "socket.io";
import {addSocket, findBySocket} from "../controllers/user.controller";
import {authenticateToken} from "../utils/jwt";

export default function(socket: Socket, io: Server) {
  let roomID = ''
  socket.on("swapStart", async (user: {room: string, token: string}) => {
    socket.join(user.room)
    roomID = user.room
    await addSocket(authenticateToken(user.token), socket.id)
    const room = Array.from(io.sockets.adapter.rooms.get(user.room))
    if (room.length == 2) {
      io.in(room[0]).emit('friendConnected', (await findBySocket(room[1])).nickname)
      io.in(room[1]).emit('friendConnected', (await findBySocket(room[0])).nickname)
    }

    socket.on('updateOffer', (offerItems) => {
      socket.to(roomID).emit('offerUpdated', offerItems)
    })
  })

  socket.on('disconnect', () => {
    io.in(roomID).emit('swapCanceled')
  })
}
