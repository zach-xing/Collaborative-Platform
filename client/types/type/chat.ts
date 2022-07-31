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
export interface IChatLine {
  id: string;
  chatId: string;
  userId: string;
  userName: string;
  chat_line: string;
  type: string;
  sendTime: string;
}
