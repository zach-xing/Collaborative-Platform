import { IsArray, IsString } from 'class-validator';

export class DeleteCloudfileDto {
  @IsString()
  content: string;

  @IsArray()
  deleteIds?: Array<string>; // 若存在的话，就是有需要删除的 file 了
}
