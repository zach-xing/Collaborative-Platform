import { IsString } from 'class-validator';

export class DeleteCloudfileDto {
  @IsString()
  id: string; // 文件[夹] id
}
