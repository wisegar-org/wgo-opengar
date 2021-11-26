import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { LocalStorageSettings } from './LocalStorageSettings';

export const axiosInst = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});

axiosInst.interceptors.request.use((config: AxiosRequestConfig) => {
  const headers = config.headers as { [key: string]: string };
  headers['authorization'] =
    localStorage.getItem(LocalStorageSettings.KEY_AUTH_TOKEN) || 'null';
  config.headers = headers;
  return config;
});

axiosInst.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error: AxiosError) {
    // Do something with response error
    if (error.response?.status === 403) {
      localStorage.setItem(LocalStorageSettings.KEY_AUTH_TOKEN, '');
      location.reload();
    }
  }
);
