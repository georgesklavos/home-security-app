import { createRouter, createWebHistory } from "@ionic/vue-router";
import Login from "../views/Login.vue";
import Alarms from "../views/Alarms.vue";
import Censors from "../views/Censors.vue";

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
  },
  {
    path: "/censors/:id",
    name: "censors",
    component: Censors
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if(localStorage.getItem("token") == null) {
    console.log(to)
    if(to.name == "alarms") {
      next("login")
    }else {
      next()
    }
  }else {
    console.log(to.path == "/login" && localStorage.getItem("token") != null);
    if(to.path == "/login" && localStorage.getItem("token") != null) {
      next("/alarms");
    }else {
      next();
    }
  }
})

export default router;
