import { getAuthToken } from '@/hooks/useAuthentication';
import axios from 'axios';
import { REST_API_ENDPOINT } from './constants';

export const publicApi = axios.create({
  baseURL: REST_API_ENDPOINT,
  withCredentials: true,
  headers: {
    Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
  },
});

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
