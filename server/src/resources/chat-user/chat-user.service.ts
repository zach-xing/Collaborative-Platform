import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatUserService {
  constructor(private prisma: PrismaService) {}
  /**
   * 根据用户的 id 获取与此用户相关的用户聊天列表
   * @param id
   */
  async findUsersById(id: string) {
    const chatUsers = await this.prisma.friend.findMany({
      where: { userId: id },
    });
    console.log(chatUsers);
    return chatUsers;
  }
}
