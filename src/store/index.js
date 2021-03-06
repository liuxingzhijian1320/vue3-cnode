import { createStore } from "vuex";

import user from "./modules/user";
import tools from "./modules/tools";

export default createStore({
  modules: {
    user,
    tools
  },
  strict: process.env.NODE_ENV !== "production" // 严格模式
});
