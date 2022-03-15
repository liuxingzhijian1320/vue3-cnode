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

/**
 * @params text String
 * @return
 */

export function copyText(text) {
  return new Promise((resolve, reject) => {
    const copyContent = text;
    // 创建input标签存放需要复制的文字
    const inputTag = document.createElement("input");
    // 把文字放进input中，供复制
    inputTag.value = copyContent;
    document.body.appendChild(inputTag);
    // 选中创建的input
    inputTag.select();
    // 执行复制方法， 该方法返回bool类型的结果，告诉我们是否复制成功
    const copyResult = document.execCommand("copy");
    // 操作中完成后 从Dom中删除创建的input
    document.body.removeChild(inputTag);
    // 根据返回的复制结果 给用户不同的提示
    if (copyResult) {
      console.log("复制成功！"); // 自己定义的提示语
      resolve();
    } else {
      console.log("复制失败！"); // 自己定义的提示语
      reject();
    }
  });
}
