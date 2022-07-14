import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
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
  @Post()
  async createApproval(@Body() createApprovalDto: CreateApprovalDto) {
    return this.approvalService.createApproval(createApprovalDto);
  }
}
