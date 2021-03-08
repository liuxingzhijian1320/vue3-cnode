import { createVNode, render } from "vue";
import MessageConstructor from "./index.vue";

const $message = function(options) {
  // 创建div
  const container = document.createElement("div");
  container.className = `__default__container__message__`;
  //创建虚拟节点
  const vm = createVNode(MessageConstructor, options);
  //渲染虚拟节点
  render(vm, container);
  document.body.appendChild(container);
};

export default {
  //组件注册
  install(app) {
    app.config.globalProperties.$message = $message;
  }
};
