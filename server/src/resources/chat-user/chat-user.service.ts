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
    // 找 chatRoom 的 userIds 包含 id 的记录
    const chatRoomIds = await this.prisma.chatRoom.findMany({
      where: {
        userIds: {
          contains: id,
        },
      },
      select: { id: true },
    });

    if (chatRoomIds.length === 0) {
      return [];
    }
    // 将 Array<{id: string}> 转变成 Array<string>
    const arr: string[] = chatRoomIds.map((item) => item.id);
    // userIdsArr.userIds 里面都是形如 ["id1,id2,id3", "id1,id4"] 之类的数据
    const userIdsArr = await this.prisma.chatRoom.findMany({
      where: {
        id: { in: arr },
      },
    });

    const res: any[] = [];
    let tmp;
    // 最后将值变成 Array<{charRoomId: string; chatUsers: {id: string;name: string;email: string;}[]}>
    for (let i = 0; i < userIdsArr.length; i += 1) {
      tmp = userIdsArr[i].userIds;
      // 用户列表
      const chatUsers = await this.prisma.user.findMany({
        where: {
          id: {
            in: tmp.split(','),
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      res.push({
        charRoomId: userIdsArr[i].id,
        chatUsers,
      });
    }

    return res;
  }
}
