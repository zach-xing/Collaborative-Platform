import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  path: '/chat',
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private ws: Server;

  // 初始化的时候
  afterInit(a: any) {
    console.log('WebSocket Initialized...');
  }

  // 初次连接
  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
    this.ws.emit('message', 'Hello');
  }
  // 断开连接的时候
  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }
  @WebSocketServer() wss: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
