import { createApp } from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";

import "./assets/styles/index.scss";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app", { username: "张沪生" });
