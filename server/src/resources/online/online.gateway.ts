import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { OnlineService } from './online.service';
import { CreateOnlineDto } from './dto/create-online.dto';

@WebSocketGateway()
export class OnlineGateway {
  constructor(private readonly onlineService: OnlineService) {}

  @SubscribeMessage('createOnline')
  create(@MessageBody() createOnlineDto: CreateOnlineDto) {
    return this.onlineService.create(createOnlineDto);
  }
}
