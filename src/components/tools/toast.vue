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
      <div class="default-toast-content" :class="position">1231</div>
    </div>
  </transition>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "填写信息",
      required: true,
    },
    seconds: {
      type: Number, // ms
      default: 2000,
    },
    position: {
      type: String,
      default: "center", // center top bottom
    },
  },
  setup(props, { attrs, slots, emit }) {
    const timer = ref(null);

    onMounted(() => {
      timer.value = setTimeout(() => {
        clearTimeout(timer.value);
        timer.value = null;
        // 不直接用的原因，避免store污染该components
        emit("closeToast");
      }, props.seconds);
    });

    return {};
  },
});
</script>


