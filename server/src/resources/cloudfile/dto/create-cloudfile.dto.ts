import { IsString } from 'class-validator';

export class CreateCloudfileDto {
  @IsString()
  content: string;

  @IsString()
  // 若存在，则说明是创建的文件，需要更改 clouddocument 表
  // {id, title}
  createFile?: string;
}
