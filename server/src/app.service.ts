import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAll() {
    const data = await this.prisma.user.findUnique({
      where: {
        id: '2',
      },
    });
    return data;
  }
}
