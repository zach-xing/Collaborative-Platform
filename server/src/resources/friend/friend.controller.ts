import { Controller, Get, Param } from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  /**
   * 根据用户 id 获取对应的好友列表
   * @param id 用户 id
   */
  @Get(':id')
  async getFriendsById(@Param('id') id: string) {
    return await this.friendService.getFriendsById(id);
  }
}
