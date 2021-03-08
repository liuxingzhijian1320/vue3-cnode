<template>
  <router-view />
</template>
<script>
import { rem } from "./assets/scripts/rem";
export default {
  name: "App",
  components: {},
  setup(props) {
    rem();
    return {};
  },
};
</script>
<style lang="scss">
body {
  font-size: 0.28rem;
}
</style>
