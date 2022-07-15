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
      },
    });

    // 若同目录下名称重复了，则返回 400 错误
    if (
      fileNames.findIndex(
        (item: { label: string }) => item.label === createCloudfileDto.label,
      ) !== -1
    ) {
      throw new HttpException('名称重复了', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.cloudFile.create({
      data: createCloudfileDto,
    });
    return 'create success';
  }

  /**
   * 获取全部文件[夹]信息
   */
  async findAll() {
    return await this.prisma.cloudFile.findMany();
  }
}
