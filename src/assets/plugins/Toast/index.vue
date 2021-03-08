<style lang="scss">
.default-toast {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  .default-toast-content {
    display: inline-block;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    color: #fff;
    padding: 7px 10px;
    transition: all 0.3s ease-out;
    animation: fadeIn 0.3s ease-out;
    position: absolute;
    text-align: center;
    &.center {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &.top {
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
    }
    &.bottom {
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
<template>
  <transition>
    <div class="default-toast">
      <div class="default-toast-content" :class="position">{{title}}</div>
    </div>
  </transition>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    seconds: {
      type: Number,
      default: 2000, // ms
    },
    position: {
      type: String,
      default: "center", // center top bottom
    },
  },
  setup(props, { emit }) {
    const timer = ref(null);

    // 移除当前组件
    function removeModal() {
      const modelDom = document.body.querySelector(
        `.__default__container__toast__`
      );
      if (modelDom) {
        document.body.removeChild(modelDom);
      }
    }

    onMounted(() => {
      timer.value = setTimeout(() => {
        clearTimeout(timer.value);
        timer.value = null;
        removeModal();
      }, props.seconds);
    });

    return {};
  },
});
</script>


