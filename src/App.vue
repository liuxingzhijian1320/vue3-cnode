<template>
  <router-view />
  <toast v-if="ToastStatus" :title="ToastConfig.title"
    :seconds="ToastConfig.seconds" :position="ToastConfig.position"
    @closeToast="closeToastHandler"></toast>
</template>
<script>
import { rem } from "./assets/scripts/rem";
import toast from "./components/tools/toast";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "App",
  components: {
    toast,
  },
  setup(props) {
    rem();
    const store = useStore();
    const ToastStatus = computed(() => store.state.tools.ToastStatus);
    const ToastConfig = computed(() => store.state.tools.ToastConfig);

    const closeToastHandler = () => {
      store.commit("closeToast");
    };

    return {
      ToastStatus,
      ToastConfig,
      closeToastHandler,
    };
  },
};
</script>
<style lang="scss">
body {
  font-size: 0.28rem;
}
</style>
