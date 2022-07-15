import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Param,
  Patch,
  Query,
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
  async create(
    @Body() createCloudfileDto: CreateCloudfileDto,
    @Query('userId') userId: string,
  ) {
    return await this.cloudfileService.create(createCloudfileDto, userId);
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
    return await this.cloudfileService.updateCloudFile(id, updateCloudfileDto);
  }

  /**
   * 根据 id 删除某个文件[夹]
   * @param id 文件[夹] id
   * @param deleteData 其中的 ids 是类似 '['1', '2']' 的存在
   */
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.cloudfileService.deleteFile(id);
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
