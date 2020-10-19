import axios from 'axios';

const instance = axios.create();

export function setTokenHeader(token) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    instance[method.toLowerCase()](path, data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log(err);
        if (err.request) reject({ message: "Sorry, something went wrong. Please try again later" });
        reject(err.response.data.error)
      })
  })
}