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
    &.disabled {
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
  &.disabled {
    background: lighten(#117cf4, 30%);
  }
}
</style>
<template>
  <div class="wrapper">
    <div class="input-div">
      <div class="label">话题</div>
      <input class="input" v-model.trim="formData.title" placeholder="请输入话题"
        type="text" />
    </div>
    <div class="input-div">
      <div class="label">板块</div>
      <div class="list">
        <span class="list-span"
          :class="{'active': activeIndex == index, 'disabled': item.disabled}"
          v-for="(item, index) in navs" :key="item"
          @click="selectItemHandler(item, index)">{{item.title}}</span>
      </div>
    </div>
    <div class="input-div">
      <div class="label">内容</div>
      <textarea class="textarea" placeholder="请输入内容" id="" cols="30" rows="10"
        v-model.trim="formData.content"></textarea>
    </div>

    <div class="submit dc" :class="{disabled: !userId}" @click="postHandler">提交
    </div>
  </div>
</template>

<script>
import { defaultSetNavsFuc } from "../../assets/scripts/utils";
import { ref, reactive, toRefs, computed } from "vue";
import { showToast, showMessage } from "../../assets/scripts/tools";
import { post } from "../../assets/scripts/request";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "post",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();

    const userId = ref(0);
    userId.value = computed(() => store.state.user.userInfo.id || 0).value;

    // navs的枚举值
    const navs = defaultSetNavsFuc();
    navs.forEach((c) => {
      if (c.type != "dev") {
        c.disabled = true;
      } else {
        c.disabled = false;
      }
    });
    const activeIndex = ref(-1);
    const obj = reactive({
      formData: {
        title: "",
        tab: "",
        content: "",
      },
    });

    const selectItemHandler = (item, index) => {
      if (item.disabled) {
        showToast({ title: "当前模块不支持测试环境使用" });
      } else {
        activeIndex.value = index;
        obj.formData.tab = item.type;
      }
    };

    const postHandler = () => {
      const { title, tab, content } = obj.formData;
      if (!title) {
        showToast({ title: "请填写标题" });
      } else if (title && title.length < 10) {
        showToast({ title: "标题长度至少为10个字" });
      } else if (!tab) {
        showToast({ title: "请选择模块" });
      } else if (!content) {
        showToast({ title: "请填写内容" });
      } else if (!userId.value) {
        showMessage({
          title: "警告",
          content: "系统检测您未登录，请登录",
          okText: "立即登录",
        }).then(() => {
          router.push(`/token`);
        });
      } else {
        showMessage({ content: "确认提交吗？", cancleText: "返回修改" }).then(
          async () => {
            const result = await post(`/topics/`, {
              accesstoken: localStorage.getItem("vue3_cnodejs_accesstoken"),
              ...obj.formData,
            });
            if (result?.success) {
              showMessage({
                title: "发布成功！",
                content: "是否立即前往？",
                cancleText: "暂时不用",
                okText: "我要去",
              }).then(() => {
                router.push(`/detail?id=${result.topic_id}`);
              });
            }
          }
        );
      }
    };

    const judgeUerid = () => {
      if (!userId.value) {
        showMessage({
          title: "温馨提示",
          content: "系统检测您未登录，暂时无法发表文章！",
          cancleText: "暂时不用",
          okText: "立即登录",
        }).then(() => {
          router.push(`/token`);
        });
      }
    };

    judgeUerid();

    return {
      navs,
      userId,
      activeIndex,
      selectItemHandler,
      ...toRefs(obj),
      postHandler,
    };
  },
};
</script>


