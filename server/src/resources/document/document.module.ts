import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentGateway } from './document.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DocumentGateway, DocumentService, PrismaService],
})
export class DocumentModule {}
