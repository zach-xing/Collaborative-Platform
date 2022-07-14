import { IsString, IsDate } from 'class-validator';

export class CreateApprovalDto {
  @IsString()
  type: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsString()
  reason: string;
}
