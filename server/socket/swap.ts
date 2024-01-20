import {Server, Socket} from "socket.io";

export default function(socket: Socket, io: Server) {
  socket.on("swapStart", (user: {room: string, token: string}) => {
    socket.join(user.room)
    const room = Array.from(io.sockets.adapter.rooms.get(user.room))
    if (io.sockets.adapter.rooms.get(user.room).size == 2) {


      socket.to(user.room).emit('swapConnected')
    }
  })

  socket.on("hello", (room) => {
    socket.to(room).emit('test')
  })
}
