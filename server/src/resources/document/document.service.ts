import { Injectable } from '@nestjs/common';
import {
  onAuthenticatePayload,
  onChangePayload,
  onLoadDocumentPayload,
  Server,
} from '@hocuspocus/server';
import { TiptapTransformer } from '@hocuspocus/transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentService {
  server: typeof Server;

  constructor(private prisma: PrismaService) {
    this.initServer();
  }

  private async initServer() {
    try {
      const server = Server.configure({
        quiet: true,
        onAuthenticate: this.onAuthenticate.bind(this),
        onLoadDocument: this.onLoadDocument.bind(this),
        onChange: this.onChange.bind(this),
        onDisconnect: this.onDisconnect.bind(this),
      });
      this.server = server;
      await this.server.listen(8889);
      console.log(`协作服务启动成功，端口：${8889}`);
    } catch (err) {
      console.error('协作服务启动失败：', err.message);
    }
  }
  async onAuthenticate({
    connection,
    token,
    requestParameters,
  }: onAuthenticatePayload) {
    const targetId = requestParameters.get('targetId');
    const docType = requestParameters.get('docType');
    const userId = requestParameters.get('userId');
    console.log('onAuthenticate');
  }

  /**
   * 创建文档
   * @param data
   * @returns
   */
  async onLoadDocument(data: onLoadDocumentPayload) {
    const { requestParameters, document } = data;
    console.log('onLoadDocument');
  }

  async onChange(data: onChangePayload) {
    const { requestParameters } = data;
    console.log('onChange');
  }

  async onDisconnect(data) {
    const { requestParameters } = data;
    const targetId = requestParameters.get('targetId');
    const docType = requestParameters.get('docType');
    const userId = requestParameters.get('userId');
    console.log('onDisconnect');
  }
}
