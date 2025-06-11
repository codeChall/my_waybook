import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomePage.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "@vueuse/core";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/chat/:partnerId",
    name: "Chat",
    component: () => import("../pages/ChatPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../pages/SignPage.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../pages/AuthPage.vue"),
  },
  {
    path: "/user-list",
    name: "UserList",
    component: () => import("../pages/UsersList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        console.log(user)
        removeListener();
        resolve(user);
      },
      reject
    )
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }
  }
  else {
    next();
  }
});

export default router;
