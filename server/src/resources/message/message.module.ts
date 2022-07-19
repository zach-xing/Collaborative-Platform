import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendService } from '../friend/friend.service';
import { ChatroomService } from '../chatroom/chatroom.service';

@Module({
  providers: [
    MessageGateway,
    MessageService,
    PrismaService,
    FriendService,
    ChatroomService,
  ],
})
export class MessageModule {}
