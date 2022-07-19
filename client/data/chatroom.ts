import request from "../utils/request";
import type { IChatMsgListItem, IChatUserListItem } from "../types";
import { useQuery } from "react-query";

export function fetchChatUserList(id: string) {
  return request({
    url: `/chatroom/${id}`,
    method: "GET",
  });
}
/**
 * 获取聊天的用户列表 hook
 * @Param id 用户的 id
 */
export function useFetchChatUserList(id: string) {
  const {
    data,
    isLoading: isLoadingWithChatUserList,
    refetch,
  } = useQuery<Array<IChatUserListItem>>(
    "ChatUserList",
    () => fetchChatUserList(id),
    {
      refetchInterval: false,
    }
  );

  return {
    chatUserList: data,
    isLoadingWithChatUserList,
    refetch,
  };
}

/**
 * 创建群组
 */
export function createGroup(data: { ids: string[]; name: string }) {
  return request({
    url: "/chatroom/creategroup",
    method: "POST",
    data,
  });
}
