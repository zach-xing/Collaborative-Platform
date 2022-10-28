import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('user')
  async getUsers() {
    return await this.adminService.getUsers();
  }

  @Get('approval')
  async getApprovals() {
    return await this.adminService.getApprovals();
  }

  @Post('approval/:id')
  async updateApproval(
    @Param('id') id: string,
    @Body() body: UpdateApprovalDto,
  ) {
    return this.adminService.updateApproval(id, body);
  }

  @Get('report')
  async getReports() {
    return await this.adminService.getReports();
  }
}
