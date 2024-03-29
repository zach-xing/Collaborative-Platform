import { useQuery } from "react-query";
import request from "../utils/requset";

function fetchUser() {
  return request({
    url: "/user",
    method: "GET",
  });
}

/**
 * 获取用户数据
 */
export function useFetchUser() {
  const { data, refetch, isLoading } = useQuery("user", fetchUser, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
  const list = data?.map((v: any) => ({ ...v, key: v.id })) || [];
  return { userList: list, refetch, isLoading };
}
