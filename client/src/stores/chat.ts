import { defineStore } from 'pinia';
import { Socket } from "socket.io-client";
import { io } from 'socket.io-client';
import { ref } from 'vue';
import MessageInterface from '../types/MessageInterface';

export const useChatStore = defineStore('chat', () => {
  const socket = ref<Socket>();
  const messages = ref<MessageInterface[]>([]);
  const isConnected = ref<boolean>(false);

  function connect(token: string, roomId: string) {
    socket.value = io('http://localhost:3000', {
      auth: {
        token
      },
    });
    socket.value.emit('join-room', roomId);


    socket.value.on('connect', () => {
      isConnected.value = true
    })

    socket.value.on('message:new', (msg) => {
      console.log(msg);

      messages.value.push(msg)
      console.log(messages.value);
    })
  };

  function sendMessage(data: any) {
    if (!isConnected.value) return

    // const message: MessageInterface = {
    //   id: Date.now(),
    //   text,
    //   user,
    //   timestamp: new Date()
    // };

    socket.value?.emit('message:send', data);
  }

  return {
    messages,
    connect,
    sendMessage
  }
},
  {
    persist: true
  }
) 