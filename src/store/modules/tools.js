const state = {
  ToastStatus: false,
  ToastConfig: {}
};

const mutations = {
  openToast(state, payload) {
    state.ToastStatus = true;
    state.ToastConfig = payload;
  },
  closeToast(state, payload) {
    state.ToastStatus = false;
    state.ToastConfig = {};
  }
};

const actions = {
  // showAlert({ state, rootState, commit, dispatch, getters }, payload) {
  //   commit('setAlertStaus', payload);
  // },
};

const getters = {
  ToastStatus: state => state.ToastStatus,
  ToastConfig: state => state.ToastConfig
};

export default {
  state,
  actions,
  getters,
  mutations
};
