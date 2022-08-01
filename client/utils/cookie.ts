import cookie from "js-cookie";

/**
 * 获取 cookie
 * @param key string
 */
export function getCookie(key: string): string | undefined {
  return cookie.get(key);
}

/**
 * 返回 cookie
 * @param key string
 */
export function setCookie(key: string, value: string): void {
  cookie.set(key, value);
}

/**
 * 移除 cookie
 * @param key string
 */
export function removeCookie(key: string) {
  cookie.remove(key);
}