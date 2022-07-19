import { IsString } from 'class-validator';

export class FeedbackMessageDto {
  @IsString()
  id: string; // Message Table id

  @IsString()
  state: 'agree' | 'reject';
}
