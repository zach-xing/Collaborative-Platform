import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCloudfileDto } from './dto/create-cloudfile.dto';
import { DeleteCloudfileDto } from './dto/delete-cloudfile.dto';
import { UpdateCloudfileDto } from './dto/update-cloudfile.dto';

@Injectable()
export class CloudfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * 根据 用户 id 创建文件[夹]的 label 或结构，当是文件时，创建 clouddocument
   */
  async createFile(id: string, body: CreateCloudfileDto) {
    try {
      await this.prisma.cloudFile.update({
        where: { id },
        data: { content: body.content },
      });
      if (body.createFile) {
        // 若 body.createFile 存在，则就是创建的 file，需要修改 clouddocument 表
        const createData = JSON.parse(body.createFile);
        await this.prisma.cloudDocument.create({
          data: {
            id: createData.id,
            title: createData.title || '未命名文档',
            text: '请输入内容',
            version: '1',
          },
        });
      }
    } catch (err) {
      throw new HttpException('创建有误', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 根据用户 id 获取全部文件[夹]的 label 或结构
   */
  async findAllById(id: string) {
    const { content } = await this.prisma.cloudFile.findUnique({
      where: { id },
      select: {
        content: true,
      },
    });
    return content;
  }

  /**
   * 根据 id 更改**文件[夹]**的 label 或结构
   * @param id 文件[夹] id
   * @param updateCloudfileDto 更改的内容
   */
  async updateFile(id: string, body: UpdateCloudfileDto) {
    try {
      await this.prisma.cloudFile.update({
        where: { id },
        data: { content: body.content },
      });
      if (body.updateFile) {
        // 若 body.updateFile 存在，则就是更改的 file，需要修改 clouddocument 表
        const updateData = JSON.parse(body.updateFile);
        await this.prisma.cloudDocument.update({
          where: { id: updateData.id },
          data: {
            title: updateData.title,
            updateTime: new Date(),
          },
        });
      }
    } catch (err) {
      throw new HttpException('更改有误', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 获取子文件[夹]的 ids
   * 简单的说，就是 获取即将删除文件夹下的子文件[夹]的 id 列表
   */
  private async getChildrenId(
    id: string,
    arr: Array<{ id: string; type: string }> = [],
  ) {
    // const data = await this.prisma.cloudFile.findMany({
    //   where: { parentId: id },
    //   select: {
    //     id: true,
    //     type: true,
    //   },
    // });
    // for (const item of data) {
    //   if (item.type === 'folder') {
    //     await this.getChildrenId(item.id, arr);
    //   }
    //   arr.push(item);
    // }
    // return arr;
  }

  /**
   * 根据 id 删除文件[夹]
   * @param id 用户 id
   */
  async deleteFile(id: string, body: DeleteCloudfileDto) {
    try {
      await this.prisma.cloudFile.update({
        where: { id },
        data: { content: body.content },
      });
      if (body.deleteIds) {
        // 若 deleteIds 存在，则说明有需要删除的文件，需更改 cloudDocument 表
        await this.prisma.cloudDocument.deleteMany({
          where: {
            id: { in: body.deleteIds },
          },
        });
      }
    } catch (err) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
    return 'delete success';
  }
}
