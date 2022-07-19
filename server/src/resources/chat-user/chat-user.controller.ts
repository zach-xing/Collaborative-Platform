import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ChatUserService } from './chat-user.service';

@Controller('chat-user')
export class ChatUserController {
  constructor(private readonly chatUserService: ChatUserService) {}

  /**
   * 根据用户的 id 获取与此用户相关的用户聊天列表
   * @param id 用户的id
   * @returns
   */
  @UseGuards(JwtGuard)
  @Get(':id')
  async findUsersById(@Param('id') id: string) {
    return await this.chatUserService.findUsersById(id);
  }
}
