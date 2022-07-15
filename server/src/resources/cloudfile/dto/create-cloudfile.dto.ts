import { IsDate, IsString } from 'class-validator';

export class CreateCloudfileDto {
  @IsString()
  label: string;

  @IsString()
  type: 'file' | 'folder';

  @IsDate()
  updateTime: Date;

  @IsString()
  parentId: string;
}
