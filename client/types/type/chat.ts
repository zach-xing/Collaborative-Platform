/** 聊天的用户列表 */
export interface IChatUserListItem {
  charRoomId: string;
  charRoomName: string;
  chatUsers: {
    id: string;
    name: string;
    email: string;
  }[];
}

/** 聊天的消息列表 */
export interface IChatMsgListItem {
  id: string;
  chatId: string;
  userId: string;
  userName: string;
  line_text: string;
  sendTime: string;
}
