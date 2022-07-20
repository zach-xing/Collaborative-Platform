import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { DocumentService } from './document.service';

@WebSocketGateway()
export class DocumentGateway {
  constructor(private readonly documentService: DocumentService) {}
}
