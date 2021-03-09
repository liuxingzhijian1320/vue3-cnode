
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 0.3rem;
}
</style>
<template>
  <div>
    <loading v-if="showloading"></loading>
    <empty v-if="!showloading && list.length === 0"></empty>
    <div class="wrapper" v-if="list.length > 0">
      <Item :item.sync="item" v-for="item in list" :key="item.id"></Item>
    </div>
  </div>
</template>

<script>
import { get } from "../../assets/scripts/request";
import { computed, toRefs, reactive, ref } from "vue";
import { useStore } from "vuex";
import Item from "../../components/item";
export default {
  name: "token",
  components: { Item },
  setup(props) {
    const store = useStore();
    const showloading = ref(false); //是否显示loading效果
    const obj = reactive({
      list: [],
    });
    const loginname = computed(() => store.state.user.userInfo.loginname);
    const fetchData = async () => {
      showloading.value = true;
      const result = await get(`/topic_collect/${loginname.value}`);
      if (result?.success) {
        result.data.forEach((code) => (code.is_collect = true));
        obj.list = result.data;
      }
      showloading.value = false;
    };

    fetchData();

    return {
      showloading,
      ...toRefs(obj),
    };
  },
};
</script>

