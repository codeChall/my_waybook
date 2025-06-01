<template>
  <main>
    <div class="messages">
      <div class="messages__item" v-for="msg in store.messages" :key="msg.id">
        [{{ msg.timestamp }}]
        {{ msg.user }}: {{ msg.text }}
      </div>
    </div>

    <form class="message-form">
      <input class="message-form__input" v-model="newMessage" @keyup.enter="handleSend" placeholder="Type a message..."
        type="text">
      <button class="message-form__btn" @click="handleSend" type="submit">
        <PaperAirplaneIcon class="message-form__btn-icon" />
      </button>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { useChatStore } from '../../../stores/chat';
import { onMounted, ref } from 'vue';
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';

const store = useChatStore();
const newMessage = ref('');
const currentUser = ref('Гость');

onMounted(() => {
  store.connect()
})

const handleSend = () => {
  if (newMessage.value.trim()) {
    store.sendMessage(newMessage.value, currentUser.value);
    newMessage.value = '';
  }
}
</script>

<style lang="scss" scoped>
.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  padding: 10px;
  border: 1px solid #c8d0df;

  &__item {
    background-color: #f3e8ff;
    color: #59168b;
    border-radius: 10px;
    min-height: 20px;
    max-width: 80%;
    padding: 10px;
  }
}

.message-form {
  display: flex;
  padding: 10px;
  gap: 5px;
  height: 41px;
  border: 1px solid #c8d0df;
  border-top: none;

  &__input {
    width: 100%;
    border: 1px solid #c8d0df;
    border-radius: 6px;
    height: 29px;
    padding: 5px;
  }

  &__btn {
    background-color: #a6abb1;
    border-radius: 6px;
    height: 40px;
    width: 40px;
    border: none;
  }

  &__btn-icon {
    height: 20px;
    width: 20px;
    transform: rotate(-45deg) translate(1px, 1px);
    color: white;
  }
}
</style>