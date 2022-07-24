import { IsDate, IsString } from 'class-validator';

export class CreateCloudfileDto {
  @IsString()
  id: string; // 文件[夹] id（客户端生成）

  @IsString()
  label: string; // 文件[夹] 名

  @IsString()
  type: 'file' | 'folder'; // 文件还是文件夹

  @IsDate()
  updateTime: Date; // 创建/更改日期

  @IsString()
  parentId: string; // 父级文件夹 id
}
