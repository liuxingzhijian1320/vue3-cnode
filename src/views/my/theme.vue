
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 0.3rem;
}
</style>
<template>
  <div class="wrapper" v-if="list.length > 0">
    <Item :item.sync="item" :show="false" v-for="item in list" :key="item.id">
    </Item>
  </div>
</template>

<script>
import { get } from "../../assets/scripts/request";
import { computed, toRefs, reactive } from "vue";
import { useStore } from "vuex";
import Item from "../../components/item";
export default {
  name: "token",
  components: { Item },
  setup(props) {
    const store = useStore();

    const obj = reactive({
      list: [],
    });
    const loginname = computed(() => store.state.user.userInfo.loginname);
    const fetchData = async () => {
      const result = await get(`/user/${loginname.value}`);
      if (result?.success) {
        obj.list = result.data.recent_topics || [];
      }
    };

    fetchData();

    return {
      ...toRefs(obj),
    };
  },
};
</script>

