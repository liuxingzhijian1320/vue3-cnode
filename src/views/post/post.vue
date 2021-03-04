<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.wrapper {
  padding: 0.3rem;
  .input-div {
    margin-bottom: 0.3rem;
  }
  .label {
    font-size: 0.3rem;
    color: #333;
    margin-bottom: 0.15rem;
  }
  .input {
    box-sizing: border-box;
    height: 0.78rem;
    width: 100%;
    border: 1px solid #999;
    padding: 0 0.3rem;
    border-radius: 0.1rem;
    color: #80bd01;
    @include hbPlaceholder {
      color: #999;
    }
    &:focus {
      border: 1px solid #80bd01;
    }
  }
  .textarea {
    width: 100%;
    border-radius: 0.1rem;
    padding: 0.3rem;
    box-sizing: border-box;
    border: 1px solid #999;
    color: #80bd01;
    @include hbPlaceholder {
      color: #999;
    }
    &:focus {
      border: 1px solid #80bd01;
    }
  }
}
.list {
  .list-span {
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border: 1px solid #999;
    font-size: 0.26rem;
    border-radius: 0.08rem;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    transition: all 0.3s ease-out;
    &.active {
      color: #80bd01;
      border-color: #80bd01;
    }
    &.disbaled {
      background: #dfdfdf;
      border-color: #dfdfdf;
    }
  }
}
.submit {
  height: 0.9rem;
  width: 100%;
  border-radius: 0.1rem;
  font-size: 0.32rem;
  color: #fff;
  background: #117cf4;
  &.disbaled {
    background: lighten(#117cf4, 30%);
  }
}
</style>
<template>
  <div class="wrapper">
    <div class="input-div">
      <div class="label">话题</div>
      <input class="input" placeholder="请输入话题" type="text" />
    </div>
    <div class="input-div">
      <div class="label">板块</div>
      <div class="list">
        <span class="list-span"
          :class="{'active': activeIndex == index, 'disbaled': item.disbaled}"
          v-for="(item, index) in navs" :key="item"
          @click="item.disbaled ? '': activeIndex = index">{{item.title}}</span>
      </div>
    </div>
    <div class="input-div">
      <div class="label">内容</div>
      <textarea class="textarea" placeholder="请输入内容" id="" cols="30"
        rows="10"></textarea>
    </div>

    <div class="submit dc">提交</div>
  </div>
</template>

<script>
import { defaultSetNavsFuc } from "../../assets/scripts/utils";
import { ref } from "vue";

export default {
  name: "post",
  components: {},
  setup() {
    // navs的枚举值
    const navs = defaultSetNavsFuc();
    navs.forEach((c) => {
      if (c.type != "dev") {
        c.disbaled = true;
      } else {
        c.disbaled = false;
      }
    });
    const activeIndex = ref(5);

    return {
      navs,
      activeIndex,
    };
  },
};
</script>


