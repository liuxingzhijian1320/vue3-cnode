<style lang="scss">
.guide {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  .guide-content {
    width: 85%;
    padding: 0.4rem 0.3rem;
    border-radius: 0.1rem;
    background: #fff;
    font-size: 0.28rem;
    line-height: 1.4;
    animation: slide 0.3s ease-in;
    h3 {
      text-align: center;
      font-size: 0.36rem;
      margin-bottom: 0.5rem;
    }
    .close {
      width: 2rem;
      height: 0.8rem;
      background: cornflowerblue;
      border-radius: 0.08rem;
      color: #fff;
      margin: 0.7rem auto 0rem auto;
    }
  }
}

@keyframes slide {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
<template>
  <div class="guide dc">
    <div class="guide-content">
      <h3>获取Token方法</h3>
      <h4>1. 需要先登录cnode社区</h4>
      <h4>2. 进入“设置”页面底部获取Access Token</h4>
      <div class="close dc" @click="close">关闭</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
});
</script>


