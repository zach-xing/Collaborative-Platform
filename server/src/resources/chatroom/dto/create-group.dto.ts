import { IsArray, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsArray()
  ids: string[];

  @IsString()
  name: string;
}
