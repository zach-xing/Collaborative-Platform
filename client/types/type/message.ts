/**
 * 消息 item
 */
export interface IMessageItem {
  id: string;
  message: string;
  state: "agree" | "reject" | "pending";
  sendUserId: string;
  recvUserId: string;
  sendTime: string;
}
