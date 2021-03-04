<template>
  <div class="home">
    <router-view></router-view>
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
