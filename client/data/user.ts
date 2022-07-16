import { Toast } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import React from "react";
import { IUser } from "../types";
import { setCookie } from "../utils/cookie";
import request from "../utils/request";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  name: string;
  email: string;
  password: string;
}

/**
 * 登录
 * @param data
 */
export function login(data: ILogin) {
  return request<IUser & { access_token: string }>({
    url: "/user/login",
    method: "POST",
    data,
  });
}

/**
 * 注册
 * @param data
 */
export function register(data: IRegister) {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
}

export function useUser() {
  /**
   * 登录
   */
  const login = React.useCallback(async (data: ILogin) => {
    try {
      const receiveData = await request<IUser & { access_token: string }>({
        url: "/user/login",
        method: "POST",
        data,
      });
      receiveData.access_token && setCookie("token", receiveData.access_token);
      window.localStorage.setItem("user", JSON.stringify(receiveData));
      Toast.success("登录成功");
    } catch (err: any) {
      Toast.error(err.message || "登录失败");
    }
  }, []);

  const register = React.useCallback(async (data: IRegister) => {
    try {
      await request({
        url: "/user/register",
        method: "POST",
        data,
      });
      Toast.success("注册成功");
    } catch (err: any) {
      Toast.error(err.message || "注册失败");
    }
  }, []);

  return {
    login,
    register,
  };
}
