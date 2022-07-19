import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FriendController],
  providers: [FriendService, PrismaService],
})
export class FriendModule {}
