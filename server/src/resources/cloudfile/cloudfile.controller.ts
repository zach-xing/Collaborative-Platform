import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
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
   *
   */
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.cloudfileService.findAll();
  }
}
