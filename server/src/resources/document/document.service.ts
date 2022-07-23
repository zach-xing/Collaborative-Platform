import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class DocumentService {
  timers: Map<string, { timeout: NodeJS.Timeout; start: number }> = new Map();
  maxDebounceTime = 10000; // 最大的防抖时间限制

  constructor(private prisma: PrismaService) {}

  /**
   * 删除指定 id 的 document
   * @param id
   */
  async deleteDocument(id: string) {
    try {
      const oldData = await this.prisma.cloudDocument.findUniqueOrThrow({
        where: { id },
      });
      if (oldData.isCollaborate) {
        // 若此文档是协作文档
        await this.prisma.collaborator.delete({
          where: { cloudDocumentId: id },
        });
      }
      await this.prisma.cloudDocument.delete({ where: { id } });
    } catch (err) {
      return new HttpException('文档删除错误', HttpStatus.BAD_REQUEST);
    }
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

    this.timers.set(id, { start, timeout: setTimeout(run, delay) });
  }
}
