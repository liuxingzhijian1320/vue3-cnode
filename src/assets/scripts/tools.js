import { app } from "../../main";

/**
 * @params title String
 * @params seconds Number
 * @params position String
 * @return
 */

export function showToast(params) {
  return new Promise((resolve, reject) => {
    app.config.globalProperties.$toast({
      ...params
    });
    resolve();
  });
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
