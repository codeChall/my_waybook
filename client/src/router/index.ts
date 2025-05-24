import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/chat', name: 'Chat', component: () => import('../pages/ChatPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
