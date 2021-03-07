const state = {
  ToastStatus: false,
  ToastConfig: {},

  MessageStatus: false,
  MessageConfig: {}
};

const mutations = {
  openToast(state, payload) {
    state.ToastStatus = true;
    state.ToastConfig = payload;
  },
  closeToast(state, payload) {
    state.ToastStatus = false;
    state.ToastConfig = {};
  },
  openMessage(state, payload) {
    console.log(888, payload);
    if (payload.type == "promise") {
      if (payload.value) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    } else {
      state.MessageStatus = true;
      state.MessageConfig = payload;
      return Promise.reject();
    }
  },
  closeMessage(state, payload) {
    state.MessageStatus = false;
    state.MessageConfig = {};
    this.commit("openMessage", { type: "promise", value: payload });
  }
};

const actions = {
  // showAlert({ state, rootState, commit, dispatch, getters }, payload) {
  //   commit('setAlertStaus', payload);
  // },
};

const getters = {
  ToastStatus: state => state.ToastStatus,
  ToastConfig: state => state.ToastConfig,

  MessageStatus: state => state.MessageStatus,
  MessageConfig: state => state.MessageConfig
};

export default {
  state,
  actions,
  getters,
  mutations
};
