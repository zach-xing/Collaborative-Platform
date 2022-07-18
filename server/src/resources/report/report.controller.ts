import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  /**
   * 创建一条新的 report 记录
   */
  @UseGuards(JwtGuard)
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createReportDto: CreateReportDto,
  ) {
    return await this.reportService.create(id, createReportDto);
  }

  /**
   * 获取所有的 report 数据
   */
  @UseGuards(JwtGuard)
  @Get(':id')
  async findAllReport(@Param('id') id: string) {
    return this.reportService.findReportById(id);
  }
}
