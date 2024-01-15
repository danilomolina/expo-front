import axios from "axios";

// ** Config
import authConfig from 'src/configs/auth'

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiEcommerce = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});
