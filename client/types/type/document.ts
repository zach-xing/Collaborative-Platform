import { IUser } from "./user";

/**
 * document 的类类型
 */
export interface IDocument {
  id: string;
  title: string;
  text: string;
  updateTime: Date;
  version: string;
  collaborators: string; // 用逗号分隔的
  ownerId: string;
  collaboratorArr: IUser[]; // 协作者信息
}
