import { createApp } from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./assets/styles/index.scss";

export const app = createApp(App);
// 自定义注册plugins
import usePluginsEffect from "./assets/plugins";
usePluginsEffect(app);

app.use(store);
app.use(router);
app.mount("#app", { username: "张沪生" });
