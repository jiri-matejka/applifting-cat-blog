import axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

export const publicApi = axios.create({
  baseURL: 'http://catblog.com:3000', //'http://localhost:3000',
});

// export const backofficeApi = axios.create({
//   baseURL: process.env.API_ENDPOINT,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

const cache = new LRU({ max: 10 });

export function configureAxiosHooks() {
  configure({ axios: publicApi, cache });
}

// axios.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers = {
//         authorization: `Bearer ${token}`
//       };
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// response interceptor intercepting 401 responses, refreshing token and retrying the request
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error.config;

//     if (error.response.status === 401 && !config._retry) {
//       // we use this flag to avoid retrying indefinitely if
//       // getting a refresh token fails for any reason
//       config._retry = true;
//       localStorage.setItem("token", await refreshAccessToken());

//       return axios(config);
//     }

//     return Promise.reject(error);
//   }
// );
