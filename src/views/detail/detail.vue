<style lang="scss">
@import "./markdown.scss";

.detail {
  padding: 0.3rem;
}
.header {
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
  .avatar {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.1rem;
    background-size: 100%;
    margin-right: 0.2rem;
  }
  .header-info {
    flex: 1;
  }
  .header-name {
    font-size: 0.3rem;
    color: #333;
    font-weight: bold;
    margin: 0.05rem 0 0.1rem 0;
  }
  .header-date {
    font-size: 0.24rem;
    color: #999;
  }
  .header-type {
    margin-top: 0.15rem;
    background-color: #e5e5e5;
    color: #999;
    padding: 0.04rem 0.08rem;
    border-radius: 0.06rem;
    height: 0.32rem;
    font-size: 0.2rem;
    &.top {
      background: #80bd01;
      color: #fff;
    }
  }
}

.title {
  font-size: 0.32rem;
  font-weight: bold;
  margin: 0.3rem 0;
}
.content-text {
  padding-bottom: 1rem;
}
</style>
<template>
  <div>
    <loading v-if="showloading"></loading>
    <div class="detail" v-if="detail?.author?.loginname">
      <div class="header">
        <div class="avatar"
          :style="{backgroundImage: `url(${detail.author.avatar_url})`}"></div>
        <div class="header-info">
          <div class="header-name">{{detail.author.loginname}}</div>
          <div class="header-date">{{formatDate(detail.create_at)}}</div>
        </div>
        <div class="cancle btn" v-if="detail.is_collect"
          @click="collectHandler(detail)">取消收藏</div>
        <div class="collect btn" v-if="!detail.is_collect"
          @click="collectHandler(detail)">收藏</div>
        <!-- <div class="header-type dc" :class="{'top': detail.top}">
        {{detail.top ? '置顶' : defaultSetNavsFuc(detail.tab)?.title}}
      </div> -->
      </div>
      <div class="title">{{detail.title}}</div>
      <div id="content-text" class="content-text">
        <div id="content-value" v-html="detail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../../assets/scripts/request";
import { useRoute } from "vue-router";
import { reactive, toRefs, ref } from "vue";
import { defaultSetNavsFuc, formatDate } from "../../assets/scripts/utils";
import { showMessage, showToast } from "../../assets/scripts/tools";

export default {
  name: "detail",
  components: {},
  setup(props) {
    const route = useRoute();
    const detailId = route.query.id;
    const resultData = reactive({ detail: {} });
    const showloading = ref(false); //是否显示loading效果

    const fetchDetail = async () => {
      showloading.value = true;
      const result = await get(`/topic/${detailId}`);
      if (result?.success) {
        resultData.detail = result.data;
      }
      showloading.value = false;
    };

    const collectHandler = async (item) => {
      if (item.is_collect) {
        showMessage({
          content: "您确定取消该收藏吗？",
          cancleText: "取消",
        }).then(async () => {
          await topicCollect(item.id, !item.is_collect);
          item.is_collect = !item.is_collect;
          showToast({ title: "取消成功" });
        });
      } else {
        await topicCollect(item.id, !item.is_collect);
        item.is_collect = !item.is_collect;
        showToast({ title: "收藏成功" });
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
      await post(url, {
        accesstoken: localStorage.getItem("vue3_cnodejs_accesstoken"),
        topic_id,
      }).catch((err) => {
        console.log(err);
      });
    };

    fetchDetail();

    return {
      showloading,
      ...toRefs(resultData),
      defaultSetNavsFuc,
      formatDate,
      collectHandler,
    };
  },
};
</script>
