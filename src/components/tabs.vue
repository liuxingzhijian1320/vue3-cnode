<template>
  <div class="tabs">
    <div class="tabs_item dc" v-for="item in tabsList" :key="item.icon">
      <router-link :to='item.name' :class="{big: item.name === 'post'}">
        <i class="iconfont icon" :class="item.icon"></i>
        <div class="tabs_title" v-if="item.name != 'post'">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  setup(props) {
    const tabsList = [
      { icon: "icon-index", text: "首页", name: "index" },
      { icon: "icon-jiahao", text: "发帖", name: "post" },
      // { icon: "icon-message", text: "消息", name: "message" },
      { icon: "icon-my", text: "我的", name: "my" },
    ];
    return { tabsList };
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  height: 1rem;
  z-index: 10;
  background: #fff;
  box-shadow: 0rem 0rem 0.3rem rgba(#999, 0.5);
  display: flex;
  .tabs_item {
    flex: 1;
    a {
      display: inline-block;
      text-align: center;
      &.big {
        margin-top: -0.5rem;
        .icon {
          font-size: 56px;
        }
      }
      .icon {
        font-size: 24px;
        text-align: center;
        color: #666;
      }
      &.router-link-active {
        color: #80bd01;
        .icon {
          color: #80bd01;
        }
      }
    }
  }
}
</style>
