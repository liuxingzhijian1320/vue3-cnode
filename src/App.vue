<template>
  <router-view />
</template>
<script>
import { rem } from "./assets/scripts/rem";
export default {
  name: "App",
  setup(props) {
    rem();
  },
};
</script>
<style lang="scss">
body {
  font-size: 0.28rem;
}
</style>
