<template>
  <div>
    <h2>Users:</h2>
    <ul>
      <li v-for="user in users" :key="user.uid">
        <router-link :to="`/chat/${user.uid}`">
          {{ user.displayName || user.email }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);

onMounted(async () => {
  const res = await fetch('http://localhost:3000/user-list');
  users.value = await res.json();
  console.log('users', users.value);
  
});
</script>
