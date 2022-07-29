import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  /**
   * 根据 id 获取指定的文档
   * @param id
   */
  async getDocument(id: string) {
    const data = await this.prisma.cloudDocument.findUnique({
      where: { id },
    });
    if (data === null) {
      throw new HttpException('获取文档失败', HttpStatus.BAD_REQUEST);
    }
    if (data.collaborators !== '') {
      // 若 collaborators 不为 ''，则表示这个文档是有协作者的
      const userArr = await this.prisma.user.findMany({
        where: {
          id: { in: data.collaborators.split(',') },
        },
      });
      return { ...data, collaboratorArr: userArr };
    }
    return data;
  }

  /**
   * 更改文档的内容
   * @param id 文件的 id
   * @param body
   */
  async updateDocument(id: string, body: UpdateDocumentDto) {
    const oldDate = await this.prisma.cloudDocument.findUnique({
      where: { id },
    });
    if (!oldDate) {
      return new HttpException('未找到指定更改文件', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.prisma.cloudDocument.update({
        where: { id: id },
        data: {
          text: body.text,
          updateTime: new Date(),
        },
      });
    } catch (error: any) {
      return new HttpException('更改文件发生错误', HttpStatus.BAD_REQUEST);
    }
    return 'update success';
  }

  /**
   * 删除指定 id 的 document
   * @param id
   */
  async deleteDocument(id: string) {
    try {
      // 删除文档的时候，首先查看 onlineEditPerson 是否存在记录，若存在，也删除
      const data = await this.prisma.onlineEditPerson.findUnique({
        where: { id },
      });
      if (data) {
        await this.prisma.onlineEditPerson.delete({ where: { id } });
      }
      await this.prisma.cloudDocument.delete({ where: { id } });
    } catch (err) {
      return new HttpException('文档删除错误', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 获取共享空间的文档（也就是被别人邀请过去编辑的文档，不包括text）
   * @param id  用户 id
   */
  async getCollaborationDocument(id: string) {
    try {
      const dataArr = await this.prisma.cloudDocument.findMany({
        where: {
          collaborators: { contains: id },
        },
        select: {
          id: true,
          title: true,
          updateTime: true,
          version: true,
          ownerId: true,
        },
      });
      const res = [];
      for (const item of dataArr) {
        const userInfo = await this.prisma.user.findUnique({
          where: { id: item.ownerId },
        });
        res.push({
          ...item,
          ownerName: userInfo.name,
          ownerEmail: userInfo.email,
        });
      }
      return res;
    } catch (error: any) {
      throw new HttpException('获取数据有误', HttpStatus.BAD_REQUEST);
    }
  }
}
