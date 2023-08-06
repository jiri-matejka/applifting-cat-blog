import { getAuthToken } from '@/hooks/useAuthentication';
import axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import { REST_API_ENDPOINT } from './constants';

export const publicApi = axios.create({
  baseURL: REST_API_ENDPOINT,
  withCredentials: true,
  headers: {
    Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
  },
});

const cache = new LRU({ max: 10 });

export function configureAxiosHooks() {
  configure({ axios: publicApi, cache });
}

publicApi.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

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
