/** 聊天的用户列表 */
export interface IChatUserListItem {
  charRoomId: string;
  chatUsers: {
    id: string;
    name: string;
    email: string;
  }[];
}

/** 聊天的消息列表 */
export interface IChatMsgListItem {
  id: string;
  name: string;
  lineText: string;
  sendTime: string;
}
