import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  /**
   * 两名用户相互添加好友并更改数据库
   * @Param id1 用户id
   * @Param id2 用户id
   */
  async addUser(id1: string, id2: string) {
    const friendInfo1 = await this.prisma.friend.findUnique({
      where: { userId: id1 },
    });
    const friendInfo2 = await this.prisma.friend.findUnique({
      where: { userId: id2 },
    });
    if (friendInfo1 === null || friendInfo2 === null) {
      throw new HttpException('没有此用户id', HttpStatus.BAD_REQUEST);
    }
    const arr1 = friendInfo1.friend_list.split(',');
    arr1.push(id2);
    const arr2 = friendInfo2.friend_list.split(',');
    arr2.push(id1);
    await this.prisma.friend.update({
      where: { userId: id1 },
      data: { friend_list: arr1.join() },
    });
    await this.prisma.friend.update({
      where: { userId: id2 },
      data: {
        friend_list: arr2.join(),
      },
    });
  }
}
