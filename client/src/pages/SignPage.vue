<template>
  <div>
    <h1>Sign Page</h1>
        <input v-model="email" type="email" placeholder="Email" class="input" required />
        <input v-model="password" type="password" placeholder="Password" class="input" required />
        <button @click="submit">Sign Up</button>
        <button @click="signInWithGoogle"> sign In With Google</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const email    = ref('');
const password = ref('');

const submit = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log('Successfully signed up!');
    })
    .catch((error) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const user = result.user;
      console.log('Successfully signed in with Google!', user);
    })
    .catch((error) => {
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