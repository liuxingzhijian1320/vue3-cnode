import { app } from "../../main";

export function showToast({ title, seconds = 2000, position = "center" }) {
  store.commit("openToast", { title, seconds, position });
}

/**
 * @params title String
 * @params content String
 * @params okText String
 * @params okTextColor String
 * @params cancleText String
 * @params cancleTextColor String
 * @return promise
 */
export function showMessage(params) {
  return new Promise((resolve, reject) => {
    app.config.globalProperties.$message({
      ...params,
      success: () => {
        return resolve("is:ok");
      },
      fail: () => {
        return reject("is:cancle");
      }
    });
  });
}
