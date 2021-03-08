import { createApp } from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./assets/styles/index.scss";

import loading from "./components/loading";

export const app = createApp(App);
// 自定义注册plugins
import usePluginsEffect from "./assets/plugins";
usePluginsEffect(app);

app.component("loading", loading);

app.use(store);
app.use(router);
app.mount("#app", { username: "张沪生" });
