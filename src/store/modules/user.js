const state = {
  userInfo: {},
  userStatus: false
};

const mutations = {
  saveUserInfo(state, payload) {
    localStorage.setItem("vue3_cnodejs_token", JSON.stringify(payload));
    state.userInfo = payload;
  },
  delUserInfo(state) {
    localStorage.removeItem("vue3_cnodejs_token");
    state.userInfo = {};
  },
  getUserInfo(state) {
    const data = JSON.parse(localStorage.getItem("vue3_cnodejs_token")) || {};
    state.userInfo = data;
  }
};

const actions = {
  // showAlert({ state, rootState, commit, dispatch, getters }, payload) {
  //   commit('setAlertStaus', payload);
  // },
};

const getters = {
  userInfo: state => state.userInfo
};

export default {
  state,
  actions,
  getters,
  mutations
};
