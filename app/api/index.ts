import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import Config from 'react-native-config';
const api = axios.create({
  baseURL: 'https://dev-api.newneek.co/', // Config.API_URL,
  timeout: 30000,
});

export default api;
