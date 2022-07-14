import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  curReport: string;

  @IsString()
  prevReport: string;

  @IsString()
  otherReport: string;
}
