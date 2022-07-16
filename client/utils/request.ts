import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return err;
  }
);
instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err) => Promise.reject(err.response.data)
);

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await instance.request<T>(config);
  return data;
};

export default request;
