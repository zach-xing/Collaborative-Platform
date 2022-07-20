import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendService } from '../friend/friend.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { FeedbackMessageDto } from './dto/feedback-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private friendService: FriendService,
    private chatroomService: ChatroomService,
  ) {}

  /**
   * 获取目前对应 id 用户的消息信息
   */
  async fetchMessage(id: string) {
    return await this.prisma.message.findMany({
      where: {
        recvUserId: id,
      },
    });
  }

  /**
   * 客户端发送邀请请求
   */
  async sendMessage(body: SendMessageDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user === null) {
      throw new HttpException('此邮箱不存在', HttpStatus.BAD_REQUEST);
    }
    const tmp = await this.prisma.user.findUnique({
      where: { id: body.sendId },
    });
    return await this.prisma.message.create({
      data: {
        message: `用户 ${tmp.name} 邀请你成为好友`,
        sendUserId: body.sendId,
        recvUserId: user.id,
      },
    });
  }

  /**
   * 客户端同意或拒绝邀请的信息
   * @param body
   */
  async feedbackMessage(body: FeedbackMessageDto) {
    try {
      // 修改信息的 state 数据
      const data = await this.prisma.message.update({
        where: { id: body.id },
        data: { state: body.state },
      });
      if (body.state === 'agree') {
        // 若同意后，更改 Frient 表和 ChatRoom 表
        await this.friendService.addUser(data.sendUserId, data.recvUserId);
        await this.chatroomService.createChatRoom([
          data.sendUserId,
          data.recvUserId,
        ]);
      }
      return { message: '反馈成功' };
    } catch (err: any) {
      return new HttpException('反馈有误', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 根据 message id 删除对应记录
   */
  async deleteMessage(body: DeleteMessageDto) {
    try {
      await this.prisma.message.delete({
        where: { id: body.id },
      });
      return { message: '删除成功' };
    } catch (err) {
      return new HttpException('删除错误', HttpStatus.BAD_REQUEST);
    }
  }
}
