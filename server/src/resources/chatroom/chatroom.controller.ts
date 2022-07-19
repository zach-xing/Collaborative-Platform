import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ChatroomService } from './chatroom.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { InviteGroupDto } from './dto/invite-group.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  /**
   * 根据用户的 id 获取与此用户相关的用户聊天列表
   * @param id 用户的id
   * @returns
   */
  @UseGuards(JwtGuard)
  @Get(':id')
  async findUsersById(@Param('id') id: string) {
    return await this.chatroomService.findUsersById(id);
  }

  /**
   * 创建一个群组
   * @param createGroupDto
   * @returns
   */
  @UseGuards(JwtGuard)
  @Post('/creategroup')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.chatroomService.createChatRoom(
      createGroupDto.ids,
      createGroupDto.name,
    );
  }

  /**
   * 邀请用户进入 Group
   */
  @Post('invitegroup')
  async inviteUserToGroup(@Body() inviteGroupDto: InviteGroupDto) {
    return this.chatroomService.inviteUserToGroup(inviteGroupDto);
  }
}
