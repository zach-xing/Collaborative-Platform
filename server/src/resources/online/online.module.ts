import { Module } from '@nestjs/common';
import { OnlineService } from './online.service';
import { OnlineGateway } from './online.gateway';

@Module({
  providers: [OnlineGateway, OnlineService]
})
export class OnlineModule {}
