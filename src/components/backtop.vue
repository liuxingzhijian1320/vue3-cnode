<style lang="scss">
.backtop {
  position: fixed;
  right: 0;
  width: 0.4rem;
  bottom: 3rem;
  padding: 0.2rem 0 0.2rem 0.2rem;
  cursor: pointer;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-right: 0;
  border-radius: 0.1rem 0 0 0.1rem;
  color: gray;
  z-index: 1000;
  font-size: 0.24rem;
}
.v-enter-from,
.v-leave-to {
  transform: translateX(30px);
}
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
<template>
  <transition>
    <div class="backtop" v-show="isActive" @click="toTop()">返回顶部</div>
  </transition>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    step: {
      //控制速度
      type: Number,
      default: 40,
    },
  },
  setup(props) {
    const isActive = ref(false);
    const scrollTop = ref(0);

    let timer = null;
    let isTop = true; // 标识是否清除定时器，为了实现在回到顶部的过程中通过滚动一下鼠标实现清除定时器从而达到滚动的目的

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
      scrollTop.value =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      if (scrollTop.value > 50) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }

      if (!isTop) {
        clearInterval(timer);
      }
      isTop = false;
    };

    const toTop = () => {
      // 设置定时器
      timer = setInterval(function () {
        // 越滚越慢，设置成负数是为了防止减不到0
        const g = 3; // 加速度 取值范围(0, ∞)
        let ispeed = Math.floor(-scrollTop.value / g);
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset =
          scrollTop.value + ispeed;
        isTop = true; // 这里记得设置，不然滚一次就停止了
        if (scrollTop.value <= 0) {
          clearInterval(timer);
          timer = null;
        }
      }, 20);
    };

    return {
      isActive,
      toTop,
      scrollTop,
    };
  },
});
</script>


