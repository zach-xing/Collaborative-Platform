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
    try {
      return await this.prisma.cloudDocument.findUniqueOrThrow({
        where: { id },
      });
    } catch (error: any) {
      throw new HttpException('获取文档失败', HttpStatus.BAD_REQUEST);
    }
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
      const oldData = await this.prisma.cloudDocument.findUniqueOrThrow({
        where: { id },
      });
      if (oldData.isCollaborate) {
        // 若此文档是协作文档
        await this.prisma.collaborator.delete({
          where: { cloudDocumentId: id },
        });
      }
      await this.prisma.cloudDocument.delete({ where: { id } });
    } catch (err) {
      return new HttpException('文档删除错误', HttpStatus.BAD_REQUEST);
    }
  }
}
