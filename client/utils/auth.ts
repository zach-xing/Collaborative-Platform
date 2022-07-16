import { getCookie } from "./cookie";

/**
 * 是否已登录
 * true 表示已登录，false 表示未登录
 */
export function isLogin() {
  return !!getCookie("token");
}
