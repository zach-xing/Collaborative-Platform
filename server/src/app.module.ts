import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { ReportModule } from './resources/report/report.module';
import { ChatModule } from './resources/chat/chat.module';
import { ApprovalModule } from './resources/approval/approval.module';
import { CloudfileModule } from './resources/cloudfile/cloudfile.module';
import { ChatUserModule } from './resources/chat-user/chat-user.module';

@Module({
  imports: [PrismaModule, UserModule, ReportModule, ChatModule, ApprovalModule, CloudfileModule, ChatUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
