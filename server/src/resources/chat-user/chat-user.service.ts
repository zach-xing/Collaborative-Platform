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
    const chatUsers = await this.prisma.friend.findUnique({
      where: { userId: id },
    });
    if (chatUsers.friend_list === '') {
      return [];
    }
    const userIdArr = chatUsers.friend_list.split(',');
    const arr = await this.prisma.user.findMany({
      where: {
        id: {
          in: userIdArr,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return arr;
  }
}
