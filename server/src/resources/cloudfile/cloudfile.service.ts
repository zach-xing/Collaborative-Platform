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
  async create(createCloudfileDto: CreateCloudfileDto) {
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
    // 当创建的是一个文件的时候，就默认创建它的文档内容
    if (createCloudfileDto.type === 'file') {
      await this.prisma.cloudDocument.create({
        data: {
          id: id,
          title: createCloudfileDto.label,
          text: '内容',
          cloudFileId: id,
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
   * 根据 id 更改文件夹内容
   * @param id 文件夹 id
   * @param updateCloudfileDto 更改的内容
   */
  async updateCloudFolder(id: string, updateCloudfileDto: UpdateCloudfileDto) {
    return 'pending...';
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
