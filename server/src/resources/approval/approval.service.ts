import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Injectable()
export class ApprovalService {
  constructor(private prisma: PrismaService) {}

  async createApproval(createApprovalDto: CreateApprovalDto) {
    await this.prisma.approval.create({
      data: createApprovalDto,
    });
    return 'create success';
  }
}
