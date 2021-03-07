import store from "../../store";

export function showToast({ title, seconds = 2000, position = "center" }) {
  store.commit("openToast", { title, seconds, position });
}

export function showMessage({
  title,
  content,
  confirmText,
  confirmTextColor,
  cancleText,
  cancleTextColor
}) {
  store
    .commit("openMessage", {
      title,
      content,
      confirmText,
      confirmTextColor,
      cancleText,
      cancleTextColor
    })
    .then(res => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
    })
    .catch(err => {
      console.log(11, err);
    });
}
