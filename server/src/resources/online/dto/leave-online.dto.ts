import { IsString } from 'class-validator';

export class LeaveOnlineDto {
  @IsString()
  uid: string; // 这是用户的id

  @IsString()
  uName: string; // 用户姓名

  @IsString()
  did: string; // 文档 id
}
