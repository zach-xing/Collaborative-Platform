import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /**
   * 获取用户列表
   */
  async getUsers() {
    return await this.prisma.user.findMany();
  }

  /**
   * 获取审批
   */
  async getApprovals() {
    const userObj = await this.getUserInfo();
    const list = await this.prisma.approval.findMany();
    const res = list.map((v) => {
      return { ...v, name: userObj[v.userId] };
    });
    return res;
  }

  /**
   * 更改某个审批
   */
  async updateApproval(id: string, body: UpdateApprovalDto) {
    try {
      await this.prisma.approval.update({
        where: { id: id },
        data: { state: body.state },
      });
      return 'success';
    } catch (error) {
      throw new HttpException('邀请失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 获取报告
   */
  async getReports() {
    const userObj = await this.getUserInfo();
    const list = await this.prisma.report.findMany();
    const res = list.map((v) => {
      return { ...v, name: userObj[v.userId] };
    });
    return res;
  }

  async getUserInfo() {
    const userList = await this.getUsers();
    const obj = {};
    userList.forEach((user) => {
      obj[user.id] = user.name;
    });
    return obj;
  }
}
