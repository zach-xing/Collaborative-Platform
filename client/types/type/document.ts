import { IUser } from "./user";

/**
 * document 的类型
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

/**
 * 协作 document 的类型（不包括 text）
 */
export interface ICDocument {
  id: string;
  title: string;
  updateTime: Date;
  version: string;
  ownerId: string;
  ownerName: string; // 作者的名字
  ownerEmail: string; // 作者的 email
}
