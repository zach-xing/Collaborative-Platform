import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
