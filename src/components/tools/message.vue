<style lang="scss">
.default-message {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba($color: #000000, $alpha: 0.3);

  .default-message-title {
    padding-top: 15px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }

  .default-message-content {
    width: 85%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 6px;
    transition: all 0.2s ease-in;
    color: #999;
    font-size: 18px;
  }

  .default-message-value {
    padding: 10px 20px 15px;
    min-height: 36px;
    position: relative;
    color: #999;
    text-align: center;
    line-height: 36px;
  }
  .default-message-btns {
    // border-top: 1px solid #ddd;
    display: flex;
    height: 46px;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      display: inline-block;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      transform: scaleY(0.5);
      background: #ddd;
    }
    .default-message-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding: 0 3px;
    }
    .default-message-cancle {
      position: relative;
      &:after {
        position: absolute;
        content: "";
        display: inline-block;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        transform: scaleX(0.5);
        background: #ddd;
      }
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
  <div class="default-message">
    <div class="default-message-content">
      <div class="default-message-title">{{title}}</div>
      <div class="default-message-value">{{content}}</div>
      <div class="default-message-btns">
        <div class="default-message-cancle default-message-btn"
          v-if="cancleText" :style="setCancleColor()" @click="optHandler(0)">
          {{cancleText}}
        </div>
        <div class="default-message-submit default-message-btn"
          :style="setConfirmColor()" @click="optHandler(1)">
          {{confirmText}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    // 标题
    title: {
      type: String,
      default: "提示",
    },
    // 内容
    content: {
      type: String,
      default: "",
      required: true,
    },
    // 确定按钮文字
    confirmText: {
      type: String,
      default: "好的",
    },
    // 确定按钮文字颜色
    confirmTextColor: {
      type: String,
      default: "#26a2ff",
    },
    // 取消按钮文字
    cancleText: {
      type: String,
      default: "",
    },
    // 取消按钮文字颜色
    cancleTextColor: {
      type: String,
      default: "#999",
    },
  },
  setup({ confirmTextColor, cancleTextColor }, { emit }) {
    const setConfirmColor = () => {
      return `color: ${confirmTextColor}`;
    };
    const setCancleColor = () => {
      return `color: ${cancleTextColor}`;
    };
    const optHandler = (value) => {
      emit("closeMessage", value);
    };
    return {
      setConfirmColor,
      setCancleColor,
      optHandler,
    };
  },
});
</script>


