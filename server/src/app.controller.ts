import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const data = await this.appService.getAll();
    if (data === null) {
      throw new NotFoundException('id x not found');
    }
    return data;
  }
}
