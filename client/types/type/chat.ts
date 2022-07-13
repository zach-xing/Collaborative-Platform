/** 聊天的用户列表 */
export interface IChatUserListItem {
  id: string;
  name: string;
  latestMsg: string;
  avatarUrl: string;
}

/** 聊天的消息列表 */
export interface IChatMsgListItem {
  id: string; 
  name: string;
  lineText: string;
  sendTime: string;
}
