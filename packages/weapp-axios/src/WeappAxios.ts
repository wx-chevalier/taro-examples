import { isProtocol } from './libs/utils';
import { CopyProxy } from './libs/CopyProxy';
import { Interceptor } from './libs/Interceptor';
import { DataType, WeappFuncParams, WxRequestOption } from './types';

const defaultOptions: WxRequestOption = {
  url: '',
  method: 'get',
  dataType: 'json',
  responseType: 'text',
  header: {
    'content-type': 'application/json',
  },
};

export const createWithWxProxy = (option: WxRequestOption): WeappAxios => {
  const ins = new WeappAxios(option);
  const cp = new CopyProxy(ins);
  const copyedIns: WeappAxios = cp.clone();
  cp.make(copyedIns, 'wx', (key: string) => (url: string, data: DataType) =>
    ins.method({ url, data, api: key }),
  );
  copyedIns.setOptions(option);

  return copyedIns;
};

export class WeappAxios {
  option: WxRequestOption;

  interceptors = {
    response: new Interceptor(),
    request: new Interceptor(),
  };

  constructor(option: WxRequestOption = defaultOptions) {
    this.option = option;
  }

  api = (url: string, data: DataType) => {
    return this.method({ url, data, method: defaultOptions.method });
  };

  get = (url: string) => {
    return this.method({ url, method: 'get' });
  };

  post = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'post' });
  };

  put = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'put' });
  };

  delete = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'delete' });
  };

  options = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'options' });
  };

  head = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'head' });
  };

  trace = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'trace' });
  };

  connect = (url: string, data: DataType) => {
    return this.method({ url, data, method: 'connect' });
  };

  setOptions = (options: WxRequestOption) => {
    Object.keys(options).forEach(val => (defaultOptions[val] = options[val]));
  };

  // 包装成 Promise 返回
  method = ({ url, data, method, api = 'request' }: WeappFuncParams) => {
    try {
      // 拦截发起请求
      return new Promise((resolve, reject) => {
        // 拦截 HTTPS
        let fnData: WxRequestOption = this.unite({
          url,
          data,
          method,
          resolve,
          reject,
        });
        fnData = this.interceptors.request.success(fnData);
        wx[api](fnData);
      });
    } catch (e) {
      return this.interceptors.request.error(e);
    }
  };

  // 拦截 HTTPS ，返回参数
  unite = ({
    url,
    data,
    method,
    resolve,
    reject,
  }: WeappFuncParams): WxRequestOption => {
    const fnData: WxRequestOption = {
      success: res => {
        const data = this.interceptors.response.success(res);
        resolve(data);
      },
      fail: res => {
        const data = this.interceptors.response.error(res);
        reject(data);
      },
    };

    fnData.method = method;

    this.mergeData(fnData, url, data);

    return fnData;
  };

  mergeData = (fnData: WxRequestOption, url: string, data: DataType) => {
    if (typeof url === 'string') {
      fnData.url = this.mergePath(url);
      fnData.data = data;
      this.fnDefaults(fnData);
    } else if (typeof url === 'object') {
      (url as any).url = this.mergePath((url as any).url);
      Object.assign(fnData, url);
      this.fnDefaults(fnData);
    }
  };

  // 判断是否需要添加默认值url
  mergePath = (url: string) => {
    return isProtocol(url) ? url : defaultOptions.url + url;
  };

  fnDefaults = (fnData: WxRequestOption) => {
    ['dataType', 'responseType', 'header'].forEach(
      val => (fnData[val] = fnData[val] ? fnData[val] : defaultOptions[val]),
    );
  };
}
