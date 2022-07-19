import { useQuery } from "react-query";
import { IUser } from "../types";
import request from "../utils/request";

function fetchFriends(id: string) {
  return request({
    url: `/friend/${id}`,
    method: "GET",
  });
}

/**
 * 根据 id 获取用户好友列表
 * @param id
 */
export function useFetchFriends(id: string) {
  const { data, refetch } = useQuery<Array<IUser>>(
    "fetchFriends",
    () => fetchFriends(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    friendList: data,
    refetch,
  };
}
