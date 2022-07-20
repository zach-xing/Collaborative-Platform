import request from "../utils/request";
import type { IChatUserListItem } from "../types";
import { useQuery } from "react-query";

function fetchChatUserList(id: string) {
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

  if (data !== undefined) {
    data.forEach((item) => {
      if (item.charRoomName === "") {
        // charRoomName 为 "" 时，就说明只有两个用户
        item.charRoomName =
          item.chatUsers[0].id === id
            ? item.chatUsers[1].name
            : item.chatUsers[0].name;
      }
    });
  }

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
