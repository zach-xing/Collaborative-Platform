import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsString } from 'class-validator';
import { CreateCloudfileDto } from './create-cloudfile.dto';

export class UpdateCloudfileDto extends PartialType(CreateCloudfileDto) {
  @IsString()
  type: 'file' | 'folder';

  @IsString()
  label: string;

  @IsDate()
  updateTime: Date;
}
