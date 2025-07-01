import { Request, Response, NextFunction } from 'express';
import { createServer } from 'http'
import { Server } from 'socket.io'
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import postRouter from './routes/postRouter';
import serviceAccount from '../serviceAccountKey.json';
import { Socket as IOSocket } from 'socket.io';
import cors from 'cors';
import { connectDB } from './config/db';

const express = require('express');
interface AuthenticatedSocket extends IOSocket {
  user?: admin.auth.DecodedIdToken;
}

const PORT = 3001;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config();

const app        = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(postRouter)
connectDB();

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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
 

httpServer.listen(PORT);