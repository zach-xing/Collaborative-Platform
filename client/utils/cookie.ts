import cookie from "js-cookie";
import Crypto from "crypto-js";

const secretKey: string = process.env.SECRET_KEY!;

/**
 * 获取 cookie
 * @param key string
 */
export function getCookie(key: string): string | null {
  let value = cookie.get(key);
  if (value !== undefined) {
    let bytes = CryptoJS.AES.decrypt(value, secretKey);
    return bytes.toString();
  } else {
    return null;
  }
}

/**
 * 返回 cookie
 * @param key string
 */
export function setCookie(key: string, value: string): void {
  cookie.set(key, Crypto.AES.encrypt(value, secretKey).toString());
}
