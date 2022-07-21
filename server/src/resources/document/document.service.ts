import { Injectable } from '@nestjs/common';
import {
  onAuthenticatePayload,
  onChangePayload,
  onLoadDocumentPayload,
  Server,
} from '@hocuspocus/server';
import { TiptapTransformer } from '@hocuspocus/transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Y from 'yjs';

@Injectable()
export class DocumentService {
  server: typeof Server;
  timers: Map<string, { timeout: NodeJS.Timeout; start: number }> = new Map();
  maxDebounceTime = 10000; // 最大的防抖时间限制

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
    const { requestParameters, update } = data;
    const node = TiptapTransformer.fromYdoc(data.document);
    const state = Buffer.from(Y.encodeStateAsUpdate(data.document));
    console.log(node);
  }

  async onDisconnect(data) {
    const { requestParameters } = data;
    const targetId = requestParameters.get('targetId');
    const docType = requestParameters.get('docType');
    const userId = requestParameters.get('userId');
    console.log('onDisconnect');
  }

  // 防抖（防止一个连接影响另外一个连接，所以使用了 Map 作为数据结构）
  private debounce(id: string, func: () => void, delay: number) {
    const old = this.timers.get(id);
    const start = old?.start || Date.now();

    // 真正的执行
    const run = () => {
      this.timers.delete(id);
      func();
    };

    if (old?.timeout) {
      clearTimeout(old.timeout);
    }

    // 防止一直输入而无法执行 func 的情况，限制了最大防抖时间
    if (Date.now() - start >= this.maxDebounceTime) {
      run();
    }

    this.timers.set(id, { start, timeout: setTimeout(run, 2000) });
  }
}
