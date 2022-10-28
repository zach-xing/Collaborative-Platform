import { IsString } from 'class-validator';

export class UpdateApprovalDto {
  @IsString()
  state: string;
}
