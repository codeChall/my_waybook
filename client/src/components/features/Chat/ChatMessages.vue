<template>
  <main>
    <div class="messages">
      <div v-for="msg in store.messages" :key="msg.id">
        [{{ msg.timestamp }}]
        {{ msg.user }}: {{ msg.text }}
      </div>
    </div>

    <input v-model="newMessage" @keyup.enter="handleSend">
    <button @click="handleSend">
      Отправить
    </button>
  </main>
</template>

<script lang="ts" setup>
import { useChatStore } from '../../../stores/chat'
import { onMounted, ref } from 'vue'

const store = useChatStore();
const newMessage = ref('')
const currentUser = ref('Гость')

onMounted(() => {
  store.connect()
})

const handleSend = () => {
  if (newMessage.value.trim()) {
    store.sendMessage(newMessage.value, currentUser.value)
    newMessage.value = ''
  }
}
</script>

<style scoped></style>