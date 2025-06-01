import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTkkodCZ9xsn3XRovpwqYcfvL1kG5QMes",
  authDomain: "mywaybook-8d948.firebaseapp.com",
  projectId: "mywaybook-8d948",
  storageBucket: "mywaybook-8d948.firebasestorage.app",
  messagingSenderId: "654889452858",
  appId: "1:654889452858:web:575b8c98e0963b2520bc03"
};

initializeApp(firebaseConfig);

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router);
app.mount('#app');
