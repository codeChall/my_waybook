import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import { Socket as IOSocket } from 'socket.io';
import cors from 'cors';

interface AuthenticatedSocket extends IOSocket {
  user?: admin.auth.DecodedIdToken;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app        = express();
const httpServer = createServer(app);

app.use(cors({
  origin: '*',
  credentials: true,
}));

const io = new Server(httpServer, {
  cors: { origin: '*', credentials: true }
});

// 🔐 Аутентификация сокета через Firebase
io.use(async (rawSocket, next) => {
  const socket = rawSocket as AuthenticatedSocket;

  const token = socket.handshake.auth?.token;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    socket.user = decoded;
    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error('Auth failed:', err.message);
    } else {
      console.error('Auth failed:', err);
    }
    next(new Error('Authentication error'));
  }
});

// Обработка подключений
io.on('connection', (rawSocket) => {
  const socket = rawSocket as AuthenticatedSocket;
  console.log('User connected:', socket.id)
  
    socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.user?.uid} joined room ${roomId}`);
  });

  // Пример обработки сообщения
  socket.on('message:send', ({ roomId, message, senderId, senderName }) => {
    console.log('User send msg:', message)
    io.to(roomId).emit('message:new', { message, senderId, senderName });
  })

  //Анжела красотка
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
});

// 📥 API: список пользователей
app.get('/user-list', async (req, res) => {
   console.log('API:');
  try {
    const result = await admin.auth().listUsers(1000);
        console.log('result:', result)

    const users = result.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));
    res.json(users);
  } catch (err) {
    res.status(500).send('Failed to fetch users');
  }
});


httpServer.listen(3000)