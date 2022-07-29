import { Module } from '@nestjs/common';
import { OnlineService } from './online.service';
import { OnlineGateway } from './online.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OnlineGateway, OnlineService, PrismaService],
})
export class OnlineModule {}
