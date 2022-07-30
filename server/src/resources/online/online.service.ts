import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnterOnlineDto } from './dto/enter-online.dto';
import { LeaveOnlineDto } from './dto/leave-online.dto';

@Injectable()
export class OnlineService {
  constructor(private prisma: PrismaService) {}

  /**
   * 获取在线人数
   * @Param id 文档的id，也是 onlineEditPerson 的主键
   */
  async fetchOnline(id: string) {
    const data = await this.prisma.onlineEditPerson.findUnique({
      where: { id },
    });
    if (data === null) {
      throw new HttpException('获取在线人数失败', HttpStatus.BAD_REQUEST);
    }
    return data.onlineCids;
  }

  /**
   * 当有用户进入时，更改 onlineEditPerson 中的记录
   */
  async enterOnline(body: EnterOnlineDto) {
    const data = await this.prisma.onlineEditPerson.findUnique({
      where: { id: body.did },
    });
    if (data === null) {
      throw new HttpException('进入失败', HttpStatus.BAD_REQUEST);
    }
    let arr: Array<string>;
    // 这里就是加入某个用户的 id
    if (data.onlineCids === '') {
      arr = [];
    } else {
      arr = data.onlineCids.split(',');
    }
    arr.push(body.uid);
    try {
      await this.prisma.onlineEditPerson.update({
        where: { id: body.did },
        data: {
          onlineCids: arr.join(','),
        },
      });
    } catch (error: any) {
      throw new HttpException('进入失败', HttpStatus.BAD_REQUEST);
    }
    return arr;
  }

  /**
   * 某用户离开时，获取此时在线人数，并通知其他在线用户
   * 更改 onlineEditPerson 中的记录
   */
  async leaveOnline(body: LeaveOnlineDto) {
    const data = await this.prisma.onlineEditPerson.findUnique({
      where: { id: body.did },
    });
    if (data === null) {
      throw new HttpException('离开失败', HttpStatus.BAD_REQUEST);
    }
    // 这里是删除某个用户的 id
    const arr = data.onlineCids.split(',');
    const idx = arr.indexOf(body.uid);
    arr.splice(idx, 1);
    try {
      await this.prisma.onlineEditPerson.update({
        where: { id: body.did },
        data: {
          onlineCids: arr.join(','),
        },
      });
    } catch (error: any) {
      throw new HttpException('离开失败', HttpStatus.BAD_REQUEST);
    }
    return arr;
  }
}
