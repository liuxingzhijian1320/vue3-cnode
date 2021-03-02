<template>
  <div class="home">
    <!-- <slot> -->
    <router-view></router-view>
    <!-- </slot> -->
    <tabs></tabs>
  </div>
</template>

<script>
import tabs from "../../components/tabs";
export default {
  name: "Home",
  components: {
    tabs,
  },
};
</script>
