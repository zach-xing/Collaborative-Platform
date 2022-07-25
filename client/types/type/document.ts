/**
 * document 的类类型
 */
export interface IDocument {
  id: string;
  title: string;
  text: string;
  isCollaborate: boolean;
  updateTime: Date;
  version: string;
}
