import { WeappAxios } from '../WeappAxios';

// @ts-ignore
declare global {
  const wx: Record<string, Function>;
}

// 用以代理 abi，生成 wx.api 的 Promise
export class CopyProxy {
  stuff: WeappAxios;

  constructor(stuff: WeappAxios) {
    this.stuff = stuff;
  }

  clone() {
    // 克隆本体函数
    const obj =
      typeof this.stuff === 'function'
        ? (this.stuff as Function).bind(this.stuff)
        : {};

    Object.assign(obj, this.stuff);

    return obj;
  }

  /**
   * obj
   * obj要代理的key
   * 触发的函数(返回代理的key)
   * 通过Proxy自动生成函数
   * ---------------------
   * proxy相对于definProperty是惰性的，触发get有返回key值参数，
   * 而definProperty触发get是没有key返回的。所以一开始就需要循环出所有的key来劫持
   */
  make(obj: any = {}, soil: any, fn: Function) {
    if (typeof Proxy === 'function') {
      return this.proxy(obj, soil, fn);
    } else {
      return this.defineProperty(obj, soil, fn);
    }
  }

  proxy(obj: any, soil: any, fn: Function) {
    this.stuff[soil] = {};
    obj[soil] = new Proxy(this.stuff[soil], {
      get(target, key, receiver) {
        if (!target[key]) target[key] = fn(key);
        // receiver 会循环
        return Reflect.get(target, key, receiver);
      },
    });
    return obj;
  }

  defineProperty(obj: any, soil: any, fn: Function) {
    const soilKey = {};
    obj[soil] = {};
    Object.keys(wx).forEach(wxApi => {
      Object.defineProperty(obj[soil], wxApi, {
        get() {
          if (!soilKey[wxApi]) soilKey[wxApi] = fn(wxApi);
          return soilKey[wxApi];
        },
      });
    });
    return obj;
  }
}
