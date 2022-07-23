import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentService } from '../document/document.service';
import { CreateCloudfileDto } from './dto/create-cloudfile.dto';
import { DeleteCloudfileDto } from './dto/delete-cloudfile.dto';
import { UpdateCloudfileDto } from './dto/update-cloudfile.dto';

interface ICloudFile {
  id: string;
  label: string;
  type: 'file' | 'folder';
  updateTime: Date;
  parendId: string;
}

@Injectable()
export class CloudfileService {
  constructor(
    private prisma: PrismaService,
    private documentService: DocumentService,
  ) {}

  /**
   * 根据 用户 id 创建文件[夹]的 label 或结构，当是文件时，创建 clouddocument
   */
  async createFile(id: string, body: CreateCloudfileDto) {
    const oldFileData = await this.prisma.cloudFile.findUnique({
      where: { id },
    });
    try {
      const oldArr: Array<ICloudFile> = JSON.parse(oldFileData.content);
      oldArr.push(body);
      await this.prisma.cloudFile.update({
        where: { id },
        data: { content: JSON.stringify(oldArr) },
      });
      if (body.type === 'file') {
        // 若创建的是 file，则更改 clouddocument 表
        await this.prisma.cloudDocument.create({
          data: {
            id: body.id,
            title: body.label || '未命名文档',
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
    const oldFileData = await this.prisma.cloudFile.findUnique({
      where: { id },
    });
    try {
      const oldArr: Array<ICloudFile> = JSON.parse(oldFileData.content);
      const idx = oldArr.findIndex((item) => item.id === body.id);
      oldArr[idx].label = body.label;
      oldArr[idx].updateTime = new Date();
      await this.prisma.cloudFile.update({
        where: { id },
        data: { content: JSON.stringify(oldArr) },
      });
      if (body.type === 'file') {
        // 若更改的是 file，则更改 clouddocument 表
        await this.prisma.cloudDocument.update({
          where: { id: body.id },
          data: {
            title: body.label,
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
  private getChildrenId(id: string, arr: Array<ICloudFile>): Array<string> {
    const res = [];
    const data = arr.filter((item) => item.parendId === id);

    for (const item of data) {
      if (item.type === 'folder') {
        res.concat(this.getChildrenId(item.id, arr));
      }
      res.push(item.id);
    }

    return res;
  }

  /**
   * 根据 id 删除文件[夹]
   * @param id 用户 id
   */
  async deleteFile(id: string, body: DeleteCloudfileDto) {
    const oldFileData = await this.prisma.cloudFile.findUnique({
      where: { id },
    });
    try {
      const oldArr: Array<ICloudFile> = JSON.parse(oldFileData.content);
      const deleteIds = this.getChildrenId(body.id, oldArr);
      const newArr: Array<ICloudFile> = [];
      for (const item of oldArr) {
        // 删除时还得检查是否 file
        if (deleteIds.indexOf(item.id) !== -1) {
          if (item.type === 'file') {
            await this.documentService.deleteDocument(item.id);
          }
        } else {
          newArr.push(item);
        }
      }
      await this.prisma.cloudFile.update({
        where: { id },
        data: { content: JSON.stringify(newArr) },
      });
    } catch (err) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
    return 'delete success';
  }
}
