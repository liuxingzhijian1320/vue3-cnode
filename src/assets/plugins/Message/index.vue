<template>
  <div class="default-message">
    <div class="default-message-content">
      <div class="default-message-title">{{title}}</div>
      <div class="default-message-value" v-html="content"></div>
      <div class="default-message-btns">
        <div class="default-message-cancle default-message-btn"
          v-if="setCancleColor" :style="setCancleColor()"
          @click.prevent.stop="handleCancel">
          {{cancleText}}
        </div>
        <div class="default-message-submit default-message-btn"
          :style="setOkColor()" @click.prevent.stop="handleOk">
          {{okText}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Message",
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
    okText: {
      type: String,
      default: "确定",
    },
    // 确定按钮文字颜色
    okTextColor: {
      type: String,
      default: "#26a2ff",
    },
    // 取消按钮文字
    cancleText: {
      type: String,
      default: "取消",
    },
    // 取消按钮文字颜色
    cancleTextColor: {
      type: String,
      default: "#999",
    },
    // 成功回调
    success: {
      type: Function,
    },
    // 失败回调
    fail: {
      type: Function,
    },
  },
  setup(props) {
    // ok的颜色
    const setOkColor = () => {
      return `color: ${props.okTextColor}`;
    };
    // 取消的颜色
    const setCancleColor = () => {
      return `color: ${props.cancleTextColor}`;
    };

    // 移除当前组件
    function removeModal() {
      const modelDom = document.body.querySelector(
        `.__default__container_message__`
      );
      if (modelDom) {
        document.body.removeChild(modelDom);
      }
    }

    const handleCancel = () => {
      removeModal();
      props.fail && props.fail();
    };

    const handleOk = () => {
      removeModal();
      props.success && props.success();
    };

    return {
      setOkColor,
      setCancleColor,

      handleOk,
      handleCancel,
    };
  },
});
</script>
<style scoped lang="scss">
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
