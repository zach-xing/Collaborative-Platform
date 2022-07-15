import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudfileDto } from './create-cloudfile.dto';

export class UpdateCloudfileDto extends PartialType(CreateCloudfileDto) {}
