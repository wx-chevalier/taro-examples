// 克隆一个全新对象，但不能对 DOM 对象和 function
export const newObj = (obj: object) => JSON.parse(JSON.stringify(obj));

// 判断开头是否 http:// 或者 https:// 的
export const isProtocol = (str: string) => {
  const b = new RegExp('^http[s]?://');
  return b.test(str);
};
