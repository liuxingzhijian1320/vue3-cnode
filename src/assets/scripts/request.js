import axios from "axios";
import { showToast } from "./tools";
const ERROR_MSG = "服务器异常，请稍后操作";

const instance = axios.create({
  baseURL: "https://cnodejs.org/api/v1",
  timeout: 10000
});

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      response => {
        if (response.data.success) {
          resolve(response.data);
        } else {
          const title = response?.data?.error_msg
            ? response.data.error_msg
            : ERROR_MSG;
          showToast({ title });
          reject(title);
        }
      },
      err => {
        reject(ERROR_MSG);
      }
    );
  });
};

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        response => {
          if (response.data.success) {
            resolve(response.data);
          } else {
            const title = response?.data?.error_msg
              ? response.data.error_msg
              : ERROR_MSG;
            showToast({ title });
            reject(title);
          }
        },
        err => {
          reject(ERROR_MSG);
        }
      );
  });
};
