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
    return await this.prisma.cloudDocument.update({
      where: { id: body.id },
      data: {
        collaborators: body.userIds,
      },
    });
  }
}
