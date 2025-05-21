import { defineStore } from 'pinia'
import { Socket } from "socket.io-client";
import { io } from 'socket.io-client'
import { ref } from 'vue'
import MessageInterface from '../types/MessageInterface';

export const useChatStore = defineStore('chat', () => {
  const socket = ref<Socket>();
  const messages = ref<MessageInterface[]>([])
  const isConnected = ref<boolean>(false)

  // Подключение к серверу
  const connect = () => {
    socket.value = io('http://localhost:3000')
    
    socket.value.on('connect', () => {
      isConnected.value = true
    })
    
    socket.value.on('message:new', (msg) => {
      messages.value.push(msg)
    })
  }

  // Отправка сообщения
  const sendMessage = (text: string, user: string) => {
    if (!isConnected.value) return
    
    const message: MessageInterface = {
      id: Date.now(),
      text,
      user,
      timestamp: new Date()
    }
    
    socket.value?.emit('message:send', message)
  }

  return { 
    socket,
    messages,
    isConnected,
    connect,
    sendMessage
  }
})