import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';

@Module({
  controllers: [FriendController],
  providers: [FriendService]
})
export class FriendModule {}
