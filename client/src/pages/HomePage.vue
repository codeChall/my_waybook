<template>
  <div class="p-4">
    <h1>Home</h1>
    <router-link to="/chat">
      <button class="">Go to Chat</button>
    </router-link>
    <router-link to="/signup">
      <button class="">Sign Up</button>
    </router-link>
    <router-link to="/auth">
      <button class="">Auth</button>
    </router-link>
    <router-link to="/user-list">
      <button class="">User List</button>
    </router-link>
    <button v-if="isLoggedIn" @click="handleSignOut">Sign Out</button>

  </div>
</template>


<script lang="ts" setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';

const isLoggedIn = ref(false);

let auth: any;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      console.log('User is logged in:', user);
    } else {
      isLoggedIn.value = false;
      console.log('No user is logged in');
    }
  });
});


const handleSignOut = () => {
  auth.signOut()
    .then(() => {
      console.log('Successfully signed out!');
    })
    .catch((error: { message: any; }) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    });
};
</script>

<style scoped>
</style>