import { IsString } from 'class-validator';

export class DeleteMessageDto {
  @IsString()
  id: string; // 需要删除的 message id
}
