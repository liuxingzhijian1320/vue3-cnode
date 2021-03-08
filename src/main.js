import { createApp } from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./assets/styles/index.scss";

import Message from "./assets/plugins/Message";

export const app = createApp(App);

app.use(Message);
app.use(store);
app.use(router);
app.mount("#app", { username: "张沪生" });
