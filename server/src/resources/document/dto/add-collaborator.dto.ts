import { IsString } from 'class-validator';

export class AddCollaboratorDto {
  @IsString()
  id: string; // 文档 id

  @IsString()
  userIds: string; // 用户的 id
}
