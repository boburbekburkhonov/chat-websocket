import path from 'path'
import express from 'express'
import { Server } from 'socket.io';

const app = express();

const PORT = process.env.PORT || 9090;

app.use(express.static(path.join(process.cwd(), 'public')))

const server = app.listen(PORT, console.log(PORT))

const io = new Server(server)

io.on('connection', socket => {
  socket.on('user-name', name => {
    socket.broadcast.emit('new-user-name', name)
  })

  socket.on('user-message', msg => {
    socket.broadcast.emit('new-user-message', msg)
  })

  socket.on('user-typing', msg => {
    socket.broadcast.emit('typing', msg)
  })

})