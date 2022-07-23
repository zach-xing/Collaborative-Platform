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
import { DeleteCloudfileDto } from './dto/delete-cloudfile.dto';
import { UpdateCloudfileDto } from './dto/update-cloudfile.dto';

@Controller('cloudfile')
export class CloudfileController {
  constructor(private readonly cloudfileService: CloudfileService) {}

  /**
   * 创建文件[夹]
   */
  @UseGuards(JwtGuard)
  @Post(':id')
  async create(
    @Body() createCloudfileDto: CreateCloudfileDto,
    @Param('id') id: string,
  ) {
    return await this.cloudfileService.createFile(id, createCloudfileDto);
  }

  /**
   *根据用户 id 获取全部文件[夹]列表
   */
  @UseGuards(JwtGuard)
  @Get(':id')
  async findAllById(@Param('id') id: string) {
    return await this.cloudfileService.findAllById(id);
  }

  /**
   * 根据用户 id 更改文件[夹]相关内容
   */
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateFile(
    @Param('id') id: string,
    @Body() updateCloudfileDto: UpdateCloudfileDto,
  ) {
    return await this.cloudfileService.updateFile(id, updateCloudfileDto);
  }

  /**
   * 根据 id 删除某个文件[夹]
   * @param id 用户 id
   * @param deleteData 其中的 ids 是类似 '['1', '2']' 的存在
   */
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Body() body: DeleteCloudfileDto) {
    return await this.cloudfileService.deleteFile(id, body);
  }
}
