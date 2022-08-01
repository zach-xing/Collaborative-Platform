import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { SendChatDto } from './dto/send-chat.dto';

@WebSocketGateway({
  path: '/chat',
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer() private ws: Server;

  constructor(private readonly chatService: ChatService) {}

  // 初始化的时候
  afterInit() {
    console.log('Chat WebSocket Initialized...');
  }

  /**
   * 获取聊天记录数据
   */
  @SubscribeMessage('fetchChat')
  async fetchChat(@MessageBody() body: { chatRoomId: string }) {
    return await this.chatService.fetchChat(body.chatRoomId);
  }

  /**
   * 处理发送信息的接口
   */
  @SubscribeMessage('sendChat')
  async sendChat(@MessageBody() body: SendChatDto) {
    const createdDate = await this.chatService.sendChat(body);
    this.ws.emit('recvChat', createdDate);
  }
}
