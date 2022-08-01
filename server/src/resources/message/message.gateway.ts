import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';
import { FeedbackMessageDto } from './dto/feedback-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@WebSocketGateway({
  path: '/message',
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class MessageGateway {
  @WebSocketServer() private ws: Server;
  constructor(private readonly messageService: MessageService) {}

  /**
   * 获取目前对应 id 用户的消息信息
   */
  @SubscribeMessage('fetchMessage')
  async fetchMessage(@MessageBody() id: string) {
    return await this.messageService.fetchMessage(id);
  }

  /**
   * 客户端发送邀请请求
   * @param body
   */
  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() body: SendMessageDto) {
    // 接收信息，并存数据库，并返回给客户端
    const data = await this.messageService.sendMessage(body);
    this.ws.emit('recvMssage', data);
    return data;
  }

  /**
   * 客户端同意或拒绝邀请的信息
   * @param body
   */
  @SubscribeMessage('feedbackMessage')
  async feedbackMessage(@MessageBody() body: FeedbackMessageDto) {
    // 同意或拒绝，同意则并更改数据库信息（message、friend、ChatRoom），拒绝则更改 message 状态信息
    return await this.messageService.feedbackMessage(body);
  }

  /**
   * 根据 message id 删除对应记录
   * @param body
   */
  @SubscribeMessage('deleteMessage')
  async deleteMessage(@MessageBody() body: DeleteMessageDto) {
    return await this.messageService.deleteMessage(body);
  }
}
