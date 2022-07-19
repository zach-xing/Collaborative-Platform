import { IsArray, IsString } from 'class-validator';

export class InviteGroupDto {
  @IsString()
  chatRoomId: string;

  @IsArray()
  ids: string[];
}
