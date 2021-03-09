<template>
  <div class="loading-content dc">
    <div class="loading">
      <div class="loading-item" :class="`loading-${item - 1}`"
        :style="`background:${bg}`" v-for="item in [1,2,3,4,5,6,7,8]"></div>

    </div>
    <div class="loading-title">{{title}}</div>
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
    title: {
      type: String,
      default: "正在加载中...",
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

  .loading-title {
    margin-left: 0.4rem;
    margin-top: 0.2rem;
    color: #999;
  }

  .loading {
    position: relative;
    width: 0.2rem;
    height: 0.2rem;

    .loading-item {
      position: absolute;
      top: 0.15rem;
      left: 0.25rem;
      width: 0.05rem;
      height: 0.1rem;
      opacity: 0.4;
      // background: red;
      animation: fadeIn 1.1s linear infinite;
    }

    @for $i from 0 through 7 {
      $time: ($i * 13+390) + ms;
      $rotate: ($i * 45+0) + deg;
      .loading-#{$i} {
        transform: rotate($rotate) translate(0, -10px);
        animation-delay: $time;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
