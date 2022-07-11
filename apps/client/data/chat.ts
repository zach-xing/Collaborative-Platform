import request from "../utils/request";
import type { IChatMsgListItem, IChatUserListItem } from "types";
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

/**
 * 添加联系人（也就是加好友）
 * @param id 用户的 id
 */
export function addPersonOption(id: string) {
  return request({
    url: `/chat/user/${id}`,
    method: "GET",
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
