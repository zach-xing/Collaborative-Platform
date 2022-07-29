import { IsString } from 'class-validator';

export class EnterOnlineDto {
  @IsString()
  uid: string; // 这是用户的id

  @IsString()
  did: string; // 文档 id
}
