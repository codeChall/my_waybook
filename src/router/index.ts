import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/chat', name: 'Chat', component: () => import('../views/ChatView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
