import { createRouter, createWebHistory } from "vue-router";
import ViewHome from "../views/ViewHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ViewHome,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/ViewLogin.vue"),
    },
  ],
});

export default router;
