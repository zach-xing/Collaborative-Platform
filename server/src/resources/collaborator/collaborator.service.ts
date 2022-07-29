import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(private prisma: PrismaService) {}

  /**
   * 邀请用户（协作者）
   * @param body 信息
   */
  async addCollaborator(body: CreateCollaboratorDto) {
    const data = await this.prisma.onlineEditPerson.findUnique({
      where: { id: body.id },
    });
    if (data === null) {
      // 若 onlineEditPerson 中不存在记录，则创建
      await this.prisma.onlineEditPerson.create({
        data: {
          id: body.id,
          onlineCids: '',
        },
      });
    }
    return await this.prisma.cloudDocument.update({
      where: { id: body.id },
      data: {
        collaborators: body.userIds,
      },
    });
  }
}
