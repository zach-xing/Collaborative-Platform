import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { OnlineService } from './online.service';
import { CreateOnlineDto } from './dto/create-online.dto';

/**
 * 这里的 online 是指的当前文档中编辑的人数
 */
@WebSocketGateway()
export class OnlineGateway {
  constructor(private readonly onlineService: OnlineService) {}

  /**
   * 获取在线人数
   */
  @SubscribeMessage('createOnline')
  create(@MessageBody() createOnlineDto: CreateOnlineDto) {
    return this.onlineService.create(createOnlineDto);
  }
}
