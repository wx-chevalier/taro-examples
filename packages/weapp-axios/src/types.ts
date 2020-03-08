export interface WeappContext {}

export type CbFunc = (res: any) => any;

export type DataType = string | object | ArrayBuffer;

export interface WxRequestOption {
  url?: string;
  data?: DataType;
  header?: Record<string, string>;
  timeout?: number;
  method?: string;
  dataType?: string;
  responseType?: string;
  success?: CbFunc;
  fail?: CbFunc;
  complete?: CbFunc;
}

export interface WeappFuncParams extends WxRequestOption {
  api?: string;
  resolve?: Function;
  reject?: Function;
}
