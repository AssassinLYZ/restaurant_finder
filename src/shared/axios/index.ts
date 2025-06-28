import axios, { type AxiosResponse, type AxiosRequestConfig, AxiosError } from 'axios';

export interface HttpResponse<T> {
  data: T;
  status: number;
  message: string;
}

let BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token;
    if (localStorage) token = localStorage?.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new AxiosError(error))
);

export const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    console.log(123)
    return axiosInstance.get<T>(url, config).then((res) => {console.log(res, 123214);return handleResponse<T>(res)});
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axiosInstance.post<T>(url, data, config).then((res) => handleResponse<T>(res));
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axiosInstance.put<T>(url, data, config).then((res) => handleResponse<T>(res));
  },

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axiosInstance.put<T>(url, data, config).then((res) => handleResponse<T>(res));
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return axiosInstance.delete<T>(url, config).then((res) => handleResponse<T>(res));
  },
};

function handleResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {

  return {
    data: response.data,
    status: response.status,
    message: response.statusText,
  };
}

export default axiosInstance;
