import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Controller('approval')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  /**
   * 创建一个新的审批
   */
  @UseGuards(JwtGuard)
  @Post(':id')
  async createApproval(
    @Param('id') id: string,
    @Body() createApprovalDto: CreateApprovalDto,
  ) {
    return this.approvalService.createApproval(id, createApprovalDto);
  }

  /**
   * 根据 userId 获取对应的 Approval 数据
   */
  @UseGuards(JwtGuard)
  @Get(':id')
  async findAllApproval(@Param('id') id: string) {
    return this.approvalService.findApprovalById(id);
  }
}
