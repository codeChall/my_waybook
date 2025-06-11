import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig.json';

initializeApp(firebaseConfig);

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router);
app.mount('#app');
