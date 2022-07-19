import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { ReportModule } from './resources/report/report.module';
import { ChatModule } from './resources/chat/chat.module';
import { ApprovalModule } from './resources/approval/approval.module';
import { CloudfileModule } from './resources/cloudfile/cloudfile.module';
import { FriendModule } from './resources/friend/friend.module';
import { MessageModule } from './resources/message/message.module';
import { ChatroomModule } from './resources/chatroom/chatroom.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ReportModule,
    ChatModule,
    ApprovalModule,
    CloudfileModule,
    FriendModule,
    MessageModule,
    ChatroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
