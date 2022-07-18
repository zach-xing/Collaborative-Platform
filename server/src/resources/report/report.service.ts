import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建一个 Report
   */
  async create(id: string, createReportDto: CreateReportDto) {
    await this.prisma.report.create({
      data: { ...createReportDto, userId: id },
    });
    return 'create success';
  }

  /**
   * 根据 id 获取全部 report 数据
   */
  async findReportById(id: string) {
    return await this.prisma.report.findMany({
      where: { userId: id },
    });
  }
}
