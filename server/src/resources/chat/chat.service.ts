import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendChatDto } from './dto/send-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  /**
   * 获取 chatRoomId 的聊天记录数据
   */
  async fetchChat(chatRoomId: string) {
    return await this.prisma.chat_Line.findMany({
      where: { chatId: chatRoomId },
      orderBy: {
        sendTime: 'asc',
      },
    });
  }

  /**
   * 处理发送信息的接口
   */
  async sendChat(body: SendChatDto) {
    return await this.prisma.chat_Line.create({
      data: {
        chatId: body.chatRoomId,
        line_text: body.chat_line,
        userId: body.userId,
        userName: body.userName,
      },
    });
  }
}
