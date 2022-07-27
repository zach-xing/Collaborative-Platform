import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  /**
   * 邀请用户（协作者）
   * @param body 信息
   */
  @UseGuards(JwtGuard)
  @Post()
  async addCollaborator(@Body() body: CreateCollaboratorDto) {
    return await this.collaboratorService.addCollaborator(body);
  }
}
