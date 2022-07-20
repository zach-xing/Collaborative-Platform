/**
 * 订阅发布
 */
export default class EventEmitter {
  private callbacks: { [key: string]: Function[] } = {};

  // 订阅
  public on(event: string, callback: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);

    return this;
  }

  // 触发
  public emit(event: string, args: any) {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach((callback) => callback.call(this, args));
    }

    return this;
  }

  // 取消订阅某个 fn 或者一整个 event
  public off(event: string, fn?: Function) {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      if (fn) {
        this.callbacks[event] = this.callbacks[event].filter(
          (item) => item !== fn
        );
      } else {
        delete this.callbacks[event];
      }
    }

    return this;
  }

  destroy() {
    this.callbacks = {};
  }
}
