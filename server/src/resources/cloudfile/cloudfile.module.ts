import { Module } from '@nestjs/common';
import { CloudfileService } from './cloudfile.service';
import { CloudfileController } from './cloudfile.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CloudfileController],
  providers: [CloudfileService, PrismaService],
})
export class CloudfileModule {}
