import { Module } from '@nestjs/common';
import { CloudfileService } from './cloudfile.service';
import { CloudfileController } from './cloudfile.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentService } from '../document/document.service';

@Module({
  controllers: [CloudfileController],
  providers: [CloudfileService, PrismaService, DocumentService],
})
export class CloudfileModule {}
