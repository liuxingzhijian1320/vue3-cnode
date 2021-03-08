
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  // padding: 0.3rem;
  background: #f5f5f5;
  box-sizing: border-box;
  .header {
    padding: 0.5rem 0.2rem;
    box-shadow: 0 0 0.3rem rgba(#999, 0.1);
    display: flex;
    color: #fff;
    background: #07dfc0;
    position: relative;
  }
  .avatar-icon {
    font-size: 1.5rem;
    color: #fff;
  }
  .header-arrow {
    right: 0.3rem;
    color: #999;
    font-size: 0.26rem;
  }
}
.list {
  width: 6.9rem;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 0.4rem;
  padding: 0 0.3rem;
  border-radius: 0.1rem;
  background: #fff;
  .item {
    display: flex;
    padding: 0.3rem 0;
    position: relative;
    .icon {
      width: 0.8rem;
    }
    .font-icon {
      font-size: 0.5rem;
    }
    .arrow-icon {
      font-size: 0.3rem;
      right: 0rem;
      color: #999;
    }
  }
}
.logout {
  height: 0.88rem;
  width: 6.9rem;
  margin: 1rem auto;
  border-radius: 0.08rem;
  background: #fc5155;
  font-size: 0.32rem;
  color: #fff;
  letter-spacing: 0.03rem;
}
</style>
<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-avatar">
        <!-- <img :src="info.avatar_url" alt=""> -->
        <i class="iconfont icon-avatar avatar-icon"></i>
      </div>
      <div class="header-name dc" @click="goLogin">
        <span v-if="!info.id">您还未登录！立即登录</span>
        <span v-else>{{info.loginname}}</span>
      </div>
      <div class="header-arrow pright" v-if="info.id"> 详情</div>
    </div>
    <div class="list">
      <div class="item px1" @click="goCollect">
        <div class="icon">
          <i class="iconfont icon-shoucang font-icon"></i>
        </div>
        <div class="value dc">我的收藏</div>
        <div class="icon">
          <i class="iconfont icon-arrow arrow-icon pright"></i>
        </div>
      </div>
      <div class="item" @click="goTheme">
        <div class="icon">
          <i class="iconfont icon-theme font-icon"></i>
        </div>
        <div class="value dc">我的主题</div>
        <div class="icon">
          <i class="iconfont icon-arrow arrow-icon pright"></i>
        </div>
      </div>
    </div>
    <div class="logout dc" v-if="info.id" @click="logout">退出</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  onMounted,
  toRefs,
  reactive,
  computed,
  watchEffect,
  watch,
  getCurrentInstance,
} from "vue";
import { showToast, showMessage } from "../../assets/scripts/tools";

export default {
  name: "my",
  components: {},
  setup(props) {
    const { ctx } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    const userInfo = reactive({
      info: {},
    });

    userInfo.info = computed(() => store.state.user.userInfo); // 这里注意指定user模块

    const goLogin = () => {
      if (!userInfo.info.loginname) {
        router.push("/token");
      }
    };

    const logout = () => {
      showMessage({ content: "您确定要退出吗？", cancleText: "取消" })
        .then((res) => {
          store.commit("delUserInfo");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goCollect = () => {
      if (!userInfo.info.id) {
        router.push("/token");
      } else {
        router.push("/collect");
      }
    };

    const goTheme = () => {
      if (!userInfo.info.id) {
        router.push("/token");
      }
    };

    return {
      ...toRefs(userInfo),

      goLogin,
      logout,
      goCollect,
      goTheme,
    };
  },
};
</script>

