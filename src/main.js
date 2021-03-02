import { createApp } from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./assets/styles/index.scss";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app", { username: "张沪生" });
