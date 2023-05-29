import {signOut} from '@core';
import {API_URL} from '@env';
import {showError, showErrorMessage} from '@utils';
import axios, {AxiosError, AxiosResponse} from 'axios';
import queryString from 'query-string';
// const API_URL = 'https://sandapps.f5seconds.vn';

const axiosClientVerify = axios.create({
  baseURL: `${API_URL}/api/sms/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: params => queryString.stringify(params),
  },
});

// axiosClientVetify.interceptors.request.use(
//   async (config: AxiosRequestConfig | any) => {
//     const token = getToken()?.access;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
axiosClientVerify.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.log('ERROR: ', error);
    if (error.response?.status === 401) {
      showErrorMessage('Phiên đăng nhập hết hạn');
      signOut();
    } else {
      showError(error);
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default axiosClientVerify;
