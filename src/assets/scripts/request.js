import axios from "axios";
import { showToast } from "./tools";

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
          showToast({ title: response.data.error_msg });
          reject(response.data.error_msg);
        }
      },
      err => {
        // showToast({ title: response.data.error_msg });
        reject(err);
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
            showToast({ title: response.data.error_msg });
            reject(response.data.error_msg);
          }
        },
        err => {
          console.log(111, err);
          // showToast({ title: response.data.error_msg });
          reject(err);
        }
      );
  });
};
