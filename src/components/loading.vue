<template>
  <div class="loading-content dc">
    <div class="loading bar">
      <div v-for="item in [1,2,3,4,5,6,7,8]" :style="`background:${bg}`"></div>
    </div>
    <div class="loading-title">
      正在加载中...
    </div>
  </div>
</template>
<script>
export default {
  name: "loading",
  props: {
    bg: {
      type: String,
      default: "#999",
    },
  },

  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading-content {
  height: 1.2rem;
}
.loading-title {
  margin-left: 0.4rem;
  margin-top: 0.2rem;
  color: #999;
}
.loading {
  position: relative;
  width: 0.2rem;
  height: 0.2rem;
}

.loading.bar div {
  position: absolute;
  top: 0.15rem;
  left: 0.25rem;
  width: 0.05rem;
  height: 0.1rem;
  opacity: 0.3;
  animation: fadeit 1.1s linear infinite;
}

.loading.bar div:nth-child(1) {
  transform: rotate(0deg) translate(0, -10px);
  animation-delay: 0.39s;
}

.loading.bar div:nth-child(2) {
  transform: rotate(45deg) translate(0, -10px);
  animation-delay: 0.52s;
}

.loading.bar div:nth-child(3) {
  transform: rotate(90deg) translate(0, -10px);
  animation-delay: 0.65s;
}

.loading.bar div:nth-child(4) {
  transform: rotate(135deg) translate(0, -10px);
  animation-delay: 0.78s;
}

.loading.bar div:nth-child(5) {
  transform: rotate(180deg) translate(0, -10px);
  animation-delay: 0.91s;
}

.loading.bar div:nth-child(6) {
  transform: rotate(225deg) translate(0, -10px);
  animation-delay: 1.04s;
}

.loading.bar div:nth-child(7) {
  transform: rotate(270deg) translate(0, -10px);
  animation-delay: 1.17s;
}

.loading.bar div:nth-child(8) {
  transform: rotate(315deg) translate(0, -10px);
  animation-delay: 1.3s;
}

@keyframes fadeit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
