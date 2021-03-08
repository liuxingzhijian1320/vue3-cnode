import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/home.vue";
import Login from "../views/login/login.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: {
      path: "/index"
    },
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/index/index")
      },

      {
        path: "/post",
        name: "post",
        component: () => import("../views/post/post")
      },
      {
        path: "/message",
        name: "message",
        component: () => import("../views/message/message")
      },
      {
        path: "/my",
        name: "my",
        component: () => import("../views/my/my")
      }
    ]
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/detail/detail")
  },
  {
    path: "/token",
    name: "token",
    component: () => import("../views/my/token")
  },
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/my/collect")
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  store.commit("getUserInfo");
  next();
});

export default router;
