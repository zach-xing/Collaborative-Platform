import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateCloudfileDto } from './create-cloudfile.dto';

export class UpdateCloudfileDto extends PartialType(CreateCloudfileDto) {
  @IsString()
  content: string;

  @IsString()
  updateFile?: string; // {id, title}
}
