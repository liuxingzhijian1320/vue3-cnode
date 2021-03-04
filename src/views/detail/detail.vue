<style lang="scss">
@import "./markdown.scss";

.detail {
  padding: 0.3rem;
}
.header {
  display: flex;
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
  <div class="detail" v-if="detail?.author?.loginname">
    <div class="header">
      <div class="avatar"
        :style="{backgroundImage: `url(${detail.author.avatar_url})`}"></div>
      <div class="header-info">
        <div class="header-name">{{detail.author.loginname}}</div>
        <div class="header-date">{{formatDate(detail.create_at)}}</div>
      </div>
      <div class="header-type dc" :class="{'top': detail.top}">
        {{detail.top ? '置顶' : defaultSetNavsFuc(detail.tab)?.title}}
      </div>
    </div>
    <div class="title">{{detail.title}}</div>
    <div id="content-text" class="content-text">
      <div id="content-value" v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
import { get } from "../../assets/scripts/request";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "vue";
import { defaultSetNavsFuc, formatDate } from "../../assets/scripts/utils";

export default {
  name: "detail",
  components: {},
  setup(props) {
    const route = useRoute();
    const detailId = route.query.id;
    const resultData = reactive({ detail: {} });

    const fetchDetail = async () => {
      const result = await get(`/topic/${detailId}`);
      if (result?.success) {
        resultData.detail = result.data;
      }
    };

    fetchDetail();

    return {
      ...toRefs(resultData),
      defaultSetNavsFuc,
      formatDate,
    };
  },
};
</script>
