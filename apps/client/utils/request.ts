import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/1227252-0-default",
  timeout: 10000,
});

instance.interceptors.request.use(
  () => {},
  () => {}
);

export default instance;
