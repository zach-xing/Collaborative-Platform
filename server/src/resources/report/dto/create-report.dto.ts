import { IsDate, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsDate()
  sendTime: Date;

  @IsString()
  curReport: string;

  @IsString()
  prevReport: string;

  @IsString()
  otherReport: string;
}
