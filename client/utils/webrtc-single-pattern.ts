import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

/**
 * WebrtcProvider 的 单例模式
 */
class SingleWebrtcProvider {
  // Map 的 key 值就是 room id
  map: Map<string, WebrtcProvider> = new Map();
  ydoc: Y.Doc;

  constructor() {
    this.ydoc = new Y.Doc();
  }

  // 进入 WebRTC 的房间
  public inviteWebRtcRoom(room: string): WebrtcProvider {
    if (this.map.has(room)) {
      console.log(1, this.map.get(room)!);
      return this.map.get(room)!;
    } else {
      console.log(2);
      const tmp = new WebrtcProvider(room, this.ydoc);
      this.map.set(room, tmp);
      return tmp;
    }
  }

  // 获取 Y.Doc
  public getYDoc() {
    return this.ydoc;
  }
}

const instance = new SingleWebrtcProvider();

export default instance;
