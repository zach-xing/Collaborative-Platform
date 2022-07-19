import { IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  sendId: string; // 发送邀请的用户 id

  @IsString()
  recvId: string; // 接收邀请的用户 id
}
