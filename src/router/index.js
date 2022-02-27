import { createRouter, createWebHistory } from "@ionic/vue-router";
import Login from "../views/Login.vue";
import Alarms from "../views/Alarms.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/alarms",
    name: "alarms",
    component: Alarms
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
