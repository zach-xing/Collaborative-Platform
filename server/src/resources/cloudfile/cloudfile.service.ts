import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCloudfileDto } from './dto/create-cloudfile.dto';
import { UpdateCloudfileDto } from './dto/update-cloudfile.dto';

@Injectable()
export class CloudfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建文件[夹]
   */
  async create(createCloudfileDto: CreateCloudfileDto, userId: string) {
    const fileNames = await this.prisma.cloudFile.findMany({
      where: {
        parentId: createCloudfileDto.parentId,
      },
      select: {
        label: true,
        type: true,
      },
    });

    // 若同目录下名称重复了，并且文件类型也相同，则返回 400 错误
    if (
      fileNames.findIndex(
        (item: { label: string; type: string }) =>
          item.label === createCloudfileDto.label &&
          item.type === createCloudfileDto.type,
      ) !== -1
    ) {
      throw new HttpException('名称重复了', HttpStatus.BAD_REQUEST);
    }

    const { id } = await this.prisma.cloudFile.create({
      data: createCloudfileDto,
      select: {
        id: true,
      },
    });
    // 当创建的是一个文件的时候，就默认创建它的文档内容（还要更新它的协作者表）
    if (createCloudfileDto.type === 'file') {
      await this.prisma.cloudDocument.create({
        data: {
          id: id,
          title: createCloudfileDto.label,
          text: '内容',
          state: Buffer.from('内容'),
          cloudFileId: id,
        },
      });
      await this.prisma.collaborator.create({
        data: {
          cloudDocumentId: id,
          userId: userId,
        },
      });
    }
    return 'create success';
  }

  /**
   * 获取全部文件[夹]信息
   */
  async findAll() {
    return await this.prisma.cloudFile.findMany();
  }

  /**
   * 根据 id 更改**文件[夹]**内容
   * @param id 文件[夹] id
   * @param updateCloudfileDto 更改的内容
   */
  async updateCloudFile(id: string, updateCloudfileDto: UpdateCloudfileDto) {
    try {
      await this.prisma.cloudFile.update({
        where: { id: id },
        data: {
          label: updateCloudfileDto.label,
          updateTime: updateCloudfileDto.updateTime,
        },
      });
      // 若文件类型是file，则还会更改里面文档的标题（因为文件名和标题是一致的）
      if (updateCloudfileDto.type === 'file') {
        await this.prisma.cloudDocument.update({
          where: { id: id },
          data: {
            title: updateCloudfileDto.label,
          },
        });
      }
    } catch (err) {
      throw new HttpException('更改失败', HttpStatus.BAD_REQUEST);
    }
    return 'update success';
  }

  /**
   * 删除指定 id
   * @param id Document id
   */
  private async deleteDocumentById(id: string) {
    await this.prisma.collaborator.delete({
      where: { cloudDocumentId: id },
    });
    await this.prisma.cloudDocument.delete({
      where: { id },
    });
  }

  /**
   * 获取子文件[夹]的 ids
   * 简单的说，就是 获取即将删除文件夹下的子文件[夹]的 id 列表
   */
  private async getChildrenId(
    id: string,
    arr: Array<{ id: string; type: string }> = [],
  ): Promise<Array<{ id: string; type: string }>> {
    const data = await this.prisma.cloudFile.findMany({
      where: { parentId: id },
      select: {
        id: true,
        type: true,
      },
    });

    for (const item of data) {
      if (item.type === 'folder') {
        await this.getChildrenId(item.id, arr);
      }
      arr.push(item);
    }

    return arr;
  }

  /**
   * 根据 id 删除文件[夹]
   * @param id 文件[夹] id
   */
  async deleteFile(id: string) {
    try {
      // 先看这条即将删除的数据是否存在
      const deletedFileData = await this.prisma.cloudFile.findUniqueOrThrow({
        where: { id },
      });
      if (deletedFileData.type === 'file') {
        // 若此条数据为 file，则先删除 cloudDocument 表中的数据
        await this.deleteDocumentById(id);
      } else {
        // 数据类型为 folder，还需要删除 parentId 为将要删除 id 的数据（也就是要删除文件夹下的子文件[夹]）
        const arr = await this.getChildrenId(id);
        const deletedIdArr = []; // 要删除文件[夹]的 id
        for (const item of arr) {
          if (item.type === 'file') {
            await this.deleteDocumentById(item.id);
          }
          deletedIdArr.push(item.id);
        }
        await this.prisma.cloudFile.deleteMany({
          where: {
            id: { in: deletedIdArr },
          },
        });
      }
      // 最后删除 cloudFile 中的数据
      await this.prisma.cloudFile.delete({
        where: { id },
      });
    } catch (err) {
      throw new HttpException('删除异常', HttpStatus.BAD_REQUEST);
    }
    return 'delete success';
  }

  /**
   * 通过 id 获取文档的相关内容
   */
  async getDocumentById(id: string) {
    const data = await this.prisma.cloudDocument.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw new HttpException('获取文档失败', HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
