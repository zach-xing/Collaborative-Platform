import { Module } from '@nestjs/common';
import { ChatUserService } from './chat-user.service';
import { ChatUserController } from './chat-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChatUserController],
  providers: [ChatUserService, PrismaService],
})
export class ChatUserModule {}
