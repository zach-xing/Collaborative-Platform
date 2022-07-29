import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnlineService } from './online.service';
import { EnterOnlineDto } from './dto/enter-online.dto';
import { LeaveOnlineDto } from './dto/leave-online.dto';

/**
 * 这里的 online 是指的当前文档中编辑的人数
 */
@WebSocketGateway({
  path: '/online',
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class OnlineGateway {
  @WebSocketServer() private ws: Server;
  constructor(private readonly onlineService: OnlineService) {}

  /**
   * 某用户进入，获取在线人数
   */
  @SubscribeMessage('enter')
  async Enter(@MessageBody() body: EnterOnlineDto) {
    const data = await this.onlineService.enterOnline(body);
    this.ws.emit('noticeEnter', { uid: body.uid, did: body.did });
    return data;
  }

  /**
   * 某用户离开时，获取此时在线人数，并通知其他在线用户
   */
  @SubscribeMessage('leave')
  async Leave(@MessageBody() body: LeaveOnlineDto) {
    const data = await this.onlineService.leaveOnline(body);
    this.ws.emit('noticeLeave', { uid: body.uid, did: body.did });
    return data;
  }
}
