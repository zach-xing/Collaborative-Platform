import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsString } from 'class-validator';
import { CreateCloudfileDto } from './create-cloudfile.dto';

export class UpdateCloudfileDto extends PartialType(CreateCloudfileDto) {
  @IsString()
  id: string; // 文件[夹] id（客户端生成）

  @IsString()
  label: string; // 文件[夹] 名

  @IsString()
  type: 'file' | 'folder'; // 文件还是文件夹

  @IsDate()
  updateTime: Date; // 创建/更改日期
}
