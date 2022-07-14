import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
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
  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.reportService.create(createReportDto);
  }

  /**
   * 获取所有的 report 数据
   */
  @UseGuards(JwtGuard)
  @Get()
  async findAllReport() {
    return this.reportService.findAllReport();
  }
}
