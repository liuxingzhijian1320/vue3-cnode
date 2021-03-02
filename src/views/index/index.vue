
<style lang="scss" scoped>
.header {
  display: flex;
  background-color: #f6f6f6;
  .header-item {
    flex: 1;
    font-size: 0.26rem;
    height: 1rem;
    .header-item-inner {
      display: inline-block;
      padding: 3px 4px;
      border-radius: 3px;
    }
    &.active {
      .header-item-inner {
        color: #fff;
        background-color: #80bd01;
      }
    }
  }
}
.content {
  padding: 0.05rem;
  border-radius: 0.06rem;
  padding-bottom: 1.2rem;
  .item {
    display: flex;
    padding: 0.1rem;
  }
  .item-avatar {
    width: 0.6rem;
    height: 0.6rem;
  }
  .item-type {
    margin: 0.1rem;
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
  .item-topic-title {
    padding-top: 0.1rem;
    flex: 1;
    overflow: hidden;
  }
  .item-title {
    color: #333;
    font-size: 0.24rem;
    width: 100%;
  }
  .item-replay {
    color: #999;
    font-size: 0.16rem;
  }
  .item-date {
    width: 1.2rem;
    text-align: right;
    font-size: 0.22rem;
  }
}
</style>
<template>
  <div class="wrapper">
    <ul class="header">
      <li class="header-item dc" @click="selectItem(index)"
        :class="{active: activeIndex==index}" v-for="(item, index) in navs"
        :key="item.title">
        <span class="header-item-inner">{{item.title}}</span>
      </li>
    </ul>

    <ul class="content">
      <li class="item px1" v-for="item in list" :key="item.id">
        <img class="item-avatar" :src="item.author.avatar_url" />
        <div class="item-type dc" :class="{'top': item.top}">
          {{item.top ? '置顶' : navs.find(code=>code.type == item.tab)?.title}}
        </div>
        <div class="item-topic-title">
          <div class="item-title of1">{{item.title}}</div>
          <div class="item-replay">{{item.reply_count}}/{{item.visit_count}}
          </div>
        </div>
        <div class="item-date dc">{{friendFuc(item.last_reply_at)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { get } from "../../assets/scripts/request";
import { friendlyFormatTime } from "../../assets/scripts/utils";

// 请求接口
const useListEffect = (showloading, datalist, { page, tab }) => {
  const getList = async ({ page, tab }) => {
    showloading.value = true;
    const result = await get(
      `/topics?page=${page.value}&tab=${tab.value}&limit=20`
    );
    if (result?.success && result?.data?.length) {
      datalist.list = [...datalist.list, ...result.data];
      showloading.value = false;
    }
  };
  getList({ page, tab }, showloading);
  return toRefs(datalist);
};

// 注册scroll事件并监听
const scrollHandler = (showloading, datalist, { page, tab }) => {
  window.addEventListener("scroll", () => {
    let scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;

    //判断是否滚动到底部
    if (scrollTop + window.innerHeight + 50 >= document.body.offsetHeight) {
      if (!showloading.value) {
        //防止多次加载
        page.value += 1;
        useListEffect(showloading, datalist, { page, tab });
      }
    }
  });
};

export default {
  name: "index",
  components: {},
  setup() {
    // navs的枚举值
    const navs = [
      {
        title: "全部",
        type: "",
      },
      {
        title: "精华",
        type: "good",
      },
      {
        title: "问答",
        type: "ask",
      },
      {
        title: "分享",
        type: "share",
      },
      {
        title: "招聘",
        type: "job",
      },
      {
        title: "测试",
        type: "dev",
      },
    ];

    // default
    const showloading = ref(true); //是否显示loading效果
    const tab = ref("");
    const page = ref(1);
    const datalist = reactive({ list: [] });

    // navs change event
    const activeIndex = ref(0);
    const selectItem = (index) => {
      activeIndex.value = index;
      tab.value = navs[index].type || "";
      resetparams();
      useListEffect(showloading, datalist, {
        page,
        tab,
      });
    };

    const resetparams = () => {
      showloading.value = true;
      datalist.list = [];
      page.value = 1;
      console.log("showloading", datalist.list);
    };

    const { list } = useListEffect(showloading, datalist, { page, tab });

    scrollHandler(showloading, datalist, { page, tab });

    const friendFuc = (str) => {
      return friendlyFormatTime(str);
    };

    return {
      navs,
      activeIndex,
      selectItem,
      list,
      page,
      tab,
      showloading,
      friendFuc,
    };
  },
};
</script>
