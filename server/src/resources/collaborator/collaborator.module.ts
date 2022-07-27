import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CollaboratorController],
  providers: [CollaboratorService, PrismaService],
})
export class CollaboratorModule {}
