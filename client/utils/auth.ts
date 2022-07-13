import { getCookie } from "./cookie";

/**
 * 做权限相关的 hook
 */
export default function useAuth() {
  /**
   * 是否已登录
   * true 表示已登录，false 表示未登录
   */
  function isLogin() {
    // TODO: 完善 isLogin
    return true;
  }

  return {
    isLogin,
  };
}
