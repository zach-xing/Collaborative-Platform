import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Injectable()
export class ApprovalService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建一个 Approval
   */
  async createApproval(createApprovalDto: CreateApprovalDto) {
    await this.prisma.approval.create({
      data: createApprovalDto,
    });
    return 'create success';
  }

  /**
   * 获取全部 Approve 信息
   */
  async findAllApproval() {
    return await this.prisma.approval.findMany();
  }
}
