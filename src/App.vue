<template>
  <router-view />
  <toast v-if="ToastStatus" :title="ToastConfig.title"
    :seconds="ToastConfig.seconds" :position="ToastConfig.position"
    @closeToast="closeToastHandler"></toast>

  <message v-if="MessageStatus" :title="MessageConfig.title"
    :content="MessageConfig.content" :confirmText="MessageConfig.confirmText"
    :confirmTextColor="MessageConfig.confirmTextColor"
    :cancleText="MessageConfig.cancleText"
    :cancleTextColor="MessageConfig.cancleTextColor"
    @closeMessage="closeMessageHandler"></message>

</template>
<script>
import { rem } from "./assets/scripts/rem";
import toast from "./components/tools/toast";
import message from "./components/tools/message";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "App",
  components: {
    toast,
    message,
  },
  setup(props) {
    rem();
    const store = useStore();
    const ToastStatus = computed(() => store.state.tools.ToastStatus);
    const ToastConfig = computed(() => store.state.tools.ToastConfig);

    const MessageStatus = computed(() => store.state.tools.MessageStatus);
    const MessageConfig = computed(() => store.state.tools.MessageConfig);

    const closeToastHandler = () => {
      store.commit("closeToast");
    };

    const closeMessageHandler = (value) => {
      store.commit("closeMessage", value);
    };

    return {
      ToastStatus,
      ToastConfig,
      MessageStatus,
      MessageConfig,

      closeToastHandler,
      closeMessageHandler,
    };
  },
};
</script>
<style lang="scss">
body {
  font-size: 0.28rem;
}
</style>
