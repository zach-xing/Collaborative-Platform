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
 * 添加联系人（也就是加好友）
 * @param id 用户的 id
 */
export function addPersonOption(id: string, email: string) {
  return request({
    url: `/chat-user`,
    method: "POST",
    data: {
      id,
      email,
    },
  });
}

/**
 * 创建群组
 * @param data 群组的name和desc
 */
export function createGroupOption(data: { name: string; desc: string }) {
  return request({
    url: "/chat/group",
    method: "POST",
    data,
  });
}

/**
 * 加入群聊
 * @param id 群聊的id
 */
export function addGroupOption(id: string) {
  return request({
    url: `/chat/group/${id}`,
    method: "GET",
  });
}

function fetchChatList(id: string) {
  return request({
    url: `/chat/${id}`,
    method: "GET",
  });
}
/**
 * 根据 chatId 获取
 * @param id ChatId
 */
export function useFetchChatList(id: string) {
  const { data, isLoading } = useQuery<{ list: Array<IChatMsgListItem> }>(
    "ChatList",
    () => fetchChatList(id),
    {
      refetchInterval: false,
    }
  );

  return {
    chatMsgList: data?.list,
    isLoading,
  };
}
