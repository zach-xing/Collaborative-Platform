import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CloudfileService } from './cloudfile.service';
import { CreateCloudfileDto } from './dto/create-cloudfile.dto';
import { UpdateCloudfileDto } from './dto/update-cloudfile.dto';

@Controller('cloudfile')
export class CloudfileController {
  constructor(private readonly cloudfileService: CloudfileService) {}

  /**
   * 创建文件[夹]
   */
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCloudfileDto: CreateCloudfileDto) {
    return await this.cloudfileService.create(createCloudfileDto);
  }

  /**
   *获取全部文件[夹]列表
   */
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.cloudfileService.findAll();
  }

  /**
   * 根据 id 更改文件[夹]相关内容
   */
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateFile(
    @Param('id') id: string,
    @Body() updateCloudfileDto: UpdateCloudfileDto,
  ) {
    if (updateCloudfileDto.type === 'folder') {
      return await this.cloudfileService.updateCloudFolder(
        id,
        updateCloudfileDto,
      );
    }
    return '开发中...';
  }

  /**
   * 通过 id 获取文档的相关内容
   * @param id 文档 id
   */
  @UseGuards(JwtGuard)
  @Get('/document/:id')
  async getDocumentById(@Param('id') id: string) {
    return await this.cloudfileService.getDocumentById(id);
  }
}
