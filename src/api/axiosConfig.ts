import axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

export const publicApi = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
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
