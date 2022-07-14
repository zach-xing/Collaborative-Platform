import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
