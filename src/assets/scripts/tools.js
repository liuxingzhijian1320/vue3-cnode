import store from "../../store";

export function showToast({ title, seconds = 2000, position = "center" }) {
  store.commit("openToast", { title });
}
