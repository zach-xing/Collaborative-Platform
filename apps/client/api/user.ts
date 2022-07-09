import request from "../utils/request";
import type { IChatUserListItem } from "types";
import { useQuery } from "react-query";

function fetchChatUserList() {
  return request({
    url: "/chat/users",
    method: "GET",
  });
}
/**
 * 获取聊天的用户列表 hook
 */
export function useFetchChatUserList() {
  const {
    data,
    isLoading: isLoadingWithChatUserList,
    refetch,
  } = useQuery<{ list: Array<IChatUserListItem> }>(
    "ChatUserList",
    fetchChatUserList,
    {
      refetchInterval: false,
    }
  );

  return {
    chatUserList: data?.list,
    isLoadingWithChatUserList,
  };
}
