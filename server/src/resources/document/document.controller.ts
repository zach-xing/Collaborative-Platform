import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  /**
   * 获取指定 id 文档
   * @param id
   */
  @UseGuards(JwtGuard)
  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    return this.documentService.getDocument(id);
  }

  /**
   * 更改文档的内容（也算保存文档）
   * @param id 文件的 id
   * @param body
   */
  @UseGuards(JwtGuard)
  @Post(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body() body: UpdateDocumentDto,
  ) {
    return await this.documentService.updateDocument(id, body);
  }
}
