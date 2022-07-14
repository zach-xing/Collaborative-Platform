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
        id: 'b7eff18d-0018-4180-bcae-acd5194d502c',
      },
    });
    return data;
  }
}
