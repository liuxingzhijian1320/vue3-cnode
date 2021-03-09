<template>
  <div class="item" @click="goDetail(item)">
    <div class="info">
      <img class="avatar" :src="item.author.avatar_url" alt="">
      <div class="item-name">
        <div class="name">{{item.author.loginname}}</div>
        <div class="time" v-if="item.create_at">{{friendFuc(item.create_at)}}
        </div>
      </div>
      <div class="cancle btn" v-if="item.is_collect && show"
        @click.stop="collectHandler(item, $event)">取消收藏</div>
      <div class="collect btn" v-if="!item.is_collect && show"
        @click.stop="collectHandler(item, $event)">收藏</div>
    </div>
    <div class="title" v-if="item.title">{{item.title}}</div>
    <div class="desc of2" v-if="item.content">{{item.content}}</div>
  </div>

</template>
<script>
import { formatDate } from "@/assets/scripts/utils";
import { post } from "@/assets/scripts/request";
import { useRouter } from "vue-router";
import { showMessage, showToast } from "@/assets/scripts/tools";

export default {
  name: "item",
  props: {
    item: {
      type: Object,
      default: {},
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const friendFuc = (str) => {
      return formatDate(str);
    };

    const collectHandler = async (item, event) => {
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
      }).then((err) => {
        console.log(err);
      });
    };

    const goDetail = ({ id }) => {
      router.push(`/detail?id=${id}`);
    };

    return {
      friendFuc,
      collectHandler,
      goDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
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
  border-radius: 0.04rem;
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
}
.desc {
  margin-top: 0.3rem;
  font-size: 0.26rem;
  color: #999;
  line-height: 1.4;
}
</style>
