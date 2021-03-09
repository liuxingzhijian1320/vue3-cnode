<template>
  <div class="empty dc">
    {{title}}
  </div>
</template>
<script>
export default {
  name: "empty",
  props: {
    title: {
      type: String,
      default: "暂无数据~",
    },
  },

  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.empty {
  height: 1.2rem;
  color: #999;
}
</style>
