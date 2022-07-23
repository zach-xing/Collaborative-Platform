import EventEmitter from "../utils/event-emitter";

export const event = new EventEmitter();

// 与用户聊天，用途是在用户列表中点击某用户后，出现与此用户聊天的界面
export const CHAT_WITH_USER = "chat-wite-user";

// 用户点击左边的文件夹后，右边显示此文件夹的信息（子文件、子文件夹）
export const SHOW_FILE_STRUCTURE = "show-file-structures";
