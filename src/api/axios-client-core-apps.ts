import {signOut} from '@core';
import {getToken} from '@core/Auth/utils';

import {showErrorMessage} from '@utils';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import queryString from 'query-string';
// const API_URL = 'https://sandapps.f5seconds.vn';
// console.log(API_URL, 'd14252');
const axiosClientCoreApps = axios.create({
  baseURL: 'https://core-apps.f5seconds.vn/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: params => queryString.stringify(params),
  },
});

axiosClientCoreApps.interceptors.request.use(
  async (config: AxiosRequestConfig | any) => {
    const token = getToken()?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClientCoreApps.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // if (error.response?.status === 401) {
    //   showErrorMessage('Phiên đăng nhập hết hạn');
    //   signOut();
    // } else {
    // }
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default axiosClientCoreApps;
