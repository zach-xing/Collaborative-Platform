import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

/**
 * WebrtcProvider 的 单例模式
 */
class SingleWebrtcProvider {
  // Map 的 key 值就是 room id
  map: Map<string, WebrtcProvider> = new Map();

  constructor() {
    // PASS
  }

  // 进入 WebRTC 的房间
  public inviteWebRtcRoom(room: string, yDoc: Y.Doc): WebrtcProvider {
    if (this.map.has(room)) {
      return this.map.get(room)!;
    } else {
      const tmp = new WebrtcProvider(room, yDoc);
      this.map.set(room, tmp);
      return tmp;
    }
  }
}

const instance = new SingleWebrtcProvider();

export default instance;
