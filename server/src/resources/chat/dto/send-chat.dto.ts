import { IsString } from 'class-validator';

export class SendChatDto {
  @IsString()
  chatRoomId: string;

  @IsString()
  chat_line: string;

  @IsString()
  type: string;

  @IsString()
  userId: string;

  @IsString()
  userName: string;
}
