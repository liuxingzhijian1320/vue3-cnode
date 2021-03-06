
<style lang="scss" scoped>
.token {
  height: 100vh;
  background: #fff;
  .img {
    width: 4rem;
    display: block;
    margin: 0.3rem auto;
  }
  .input {
    height: 0.8rem;
    border: 1px solid #999;
    color: #333;
    width: 6rem;
    border-radius: 0.1rem;
    text-align: center;
  }
  .submit {
    width: 6rem;
    height: 0.7rem;
    border-radius: 0.1rem;
    background: #117cf4;
    color: #fff;
    font-size: 0.3rem;
    margin-top: 0.5rem;
  }
  .tips {
    margin-top: 0.15rem;
    font-size: 0.24rem;
    color: #999;
    a {
      color: #284af9;
    }
  }
}
</style>
<template>
  <div class="token dc">
    <div class="content">
      <img class="img" src="../../assets/images/logo.png" alt="">
      <input type="text" placeholder="请输入token" v-model.trim="token"
        class="input" />
      <div class="tips">当前的token获取方式：<a target="_blank"
          href="https://cnodejs.org/setting">传送门👋👋👋</a> </div>
      <div class="submit dc" @click="submit">登录</div>
    </div>
  </div>
</template>


<script>
import { post } from "../../assets/scripts/request";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "token",
  components: {},
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const token = ref("ae39d217-a130-492f-ad57-a2db3a5fe66d");

    const submit = async () => {
      if (!token.value) return;
      const result = await post(`/accesstoken/`, { accesstoken: token.value });
      if (result?.success) {
        const { avatar_url, id, loginname } = result;
        const data = {
          avatar_url,
          id,
          loginname,
        };
        store.commit("saveUserInfo", data);
        router.push("/my");
      }
    };

    return {
      token,
      submit,
    };
  },
};
</script>

