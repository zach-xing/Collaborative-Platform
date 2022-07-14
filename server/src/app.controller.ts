import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './common/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getHello(): Promise<any> {
    const data = await this.appService.getAll();
    if (data === null) {
      throw new NotFoundException('id x not found');
    }
    return data;
  }
}
