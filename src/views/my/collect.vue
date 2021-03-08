
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 0.3rem;
  .item {
    margin-bottom: 0.3rem;
    background: #fff;
    padding: 0.3rem;
    border-radius: 0.06rem;
  }
  .info {
    display: flex;
    position: relative;
    .btn {
      padding: 0.1rem;

      color: #fff;
      position: absolute;
      right: 0rem;
      top: 0.1rem;
      font-size: 0.26rem;
      border-radius: 0.04rem;
    }
    .cancle {
      background: #909090;
    }
    .collect {
      background: #80bd01;
    }
  }
  .avatar {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
  }
  .name {
    font-size: 0.3rem;
    color: #333;
    margin-bottom: 0.05rem;
    font-weight: bold;
  }
  .time {
    font-size: 0.28rem;
    color: #999;
  }
  .title {
    font-size: 0.32rem;
    font-weight: bold;
    margin-top: 0.2rem;
    margin-bottom: 0.3rem;
  }
  .desc {
    font-size: 0.26rem;
    color: #999;
    line-height: 1.4;
  }
}
</style>
<template>
  <div class="wrapper">
    <div class="item" @click="goDetail(item)" v-for="item in list"
      :key="item.id">
      <div class="info">
        <img class="avatar" :src="item.author.avatar_url" alt="">
        <div class="item-name">
          <div class="name">{{item.author.loginname}}</div>
          <div class="time">{{friendFuc(item.create_at)}}</div>
        </div>
        <div class="cancle btn" v-if="item.is_colelct"
          @click="cancleCollect(item, $event)">取消收藏</div>
        <div class="collect btn" v-if="!item.is_colelct"
          @click="cancleCollect(item, $event)">收藏</div>
      </div>
      <div class="title">{{item.title}}</div>
      <div class="desc of2">{{item.content}}</div>
    </div>
  </div>
</template>


<script>
import { get, post } from "../../assets/scripts/request";
import { ref, computed, toRefs, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { formatDate } from "../../assets/scripts/utils";
import { showMessage, showToast } from "../../assets/scripts/tools";
export default {
  name: "token",
  components: {},
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const obj = reactive({
      list: [],
    });
    const loginname = computed(() => store.state.user.userInfo.loginname);
    const fetchData = async () => {
      const result = await get(`/topic_collect/${loginname.value}`);
      if (result?.success) {
        result.data.forEach((code) => (code.is_colelct = true));
        obj.list = result.data;
      }
    };

    const topicCollect = async (topic_id, type) => {
      let url = "";
      if (type) {
        // 收藏主题
        url = `/topic_collect/collect`;
      } else {
        // 取消主题
        url = `/topic_collect/de_collect`;
      }
      const result = await post(url, {
        accesstoken: localStorage.getItem("vue3_cnodejs_accesstoken"),
        topic_id,
      });
      // if (result?.success) {
      // }
    };

    const friendFuc = (str) => {
      return formatDate(str);
    };

    const goDetail = ({ id }) => {
      router.push(`/detail?id=${id}`);
    };

    const cancleCollect = (item, event) => {
      // console.log(item, event);
      let e = event ? event : window.event;
      e.stopPropagation();

      if (item.is_colelct) {
        showMessage({
          content: "您确定取消该收藏吗？",
          cancleText: "取消",
        }).then(() => {
          topicCollect(item.id, !item.is_colelct);
          item.is_colelct = !item.is_colelct;
          showToast({ title: "取消成功" });
        });
      } else {
        topicCollect(item.id, !item.is_colelct);
        item.is_colelct = !item.is_colelct;
        showToast({ title: "收藏成功" });
      }
    };

    fetchData();

    return {
      ...toRefs(obj),

      friendFuc,
      goDetail,
      cancleCollect,
    };
  },
};
</script>

