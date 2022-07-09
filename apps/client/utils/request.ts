import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://mock.apifox.cn/m1/1257897-0-default",
  timeout: 10000,
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
  (err) => err
);

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await instance.request<T>(config);
  return data;
};

export default request;
