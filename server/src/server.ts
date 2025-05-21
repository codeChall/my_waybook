import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Обработка подключений
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  // Пример обработки сообщения
  socket.on('message:send', (msg) => {
    io.emit('message:new', msg)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
});

httpServer.listen(3000)