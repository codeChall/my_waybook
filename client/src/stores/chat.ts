import { defineStore } from 'pinia'
import { Socket } from "socket.io-client";
import { io } from 'socket.io-client'
import { ref } from 'vue'
import MessageInterface from '../types/MessageInterface';

export const useChatStore = defineStore('chat', {
  // const socket = ref<Socket>();
  // const messages = ref<MessageInterface[]>([])
  // const isConnected = ref<boolean>(false)

  state: () => ({
      socket: {} as Socket,
      messages: [] as MessageInterface[],
      isConnected: false as Boolean,
  }),

  actions: {
    // Подключение к серверу
    connect() {
      this.socket = io('http://localhost:3000')

      this.socket.on('connect', () => {
        this.isConnected = true
      })

      this.socket.on('message:new', (msg) => {
        console.log(msg);
        
        this.messages.push(msg)
        console.log(this.messages);
      })
    },

    // // Отправка сообщения
    sendMessage(text: string, user: string) {
      if (!this.isConnected) return

      const message: MessageInterface = {
        id: Date.now(),
        text,
        user,
        timestamp: new Date()
      }

      this.socket?.emit('message:send', message)
    }
  },
  persist: [
    {
      storage: localStorage
    }
  ]

})