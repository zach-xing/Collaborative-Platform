import { IsString } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  text: string; // 这是内容（已经被 JSON.stringify）
}
