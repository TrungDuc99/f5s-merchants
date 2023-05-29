import {FileParams, FileRes} from '@models/upload';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'https://sandapps.f5seconds.vn/api-merchant/api/storage',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // if (config.url?.includes('uploadFiles')) {
    //   config.headers['Content-Type'] = 'multipart/form-data';
    // }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

const uploadApi = {
  getAll: (params: FileParams): Promise<FileRes> => {
    const url = '/files/doiSoat';
    return axiosClient.get(url, {params});
  },
  uploadFiles: (formData: FormData): Promise<any> => {
    const url = '/files/upload';
    return axiosClient.post(url, formData);
  },
};
export default uploadApi;
