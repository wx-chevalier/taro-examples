/** 确保存在 finally 方法 */
export function enableFinally() {
  if (typeof Promise.prototype.finally === 'undefined') {
    Promise.prototype.finally = function(callback) {
      const P: PromiseConstructor = this.constructor as PromiseConstructor;
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason =>
          P.resolve(callback()).then(() => {
            throw reason;
          }),
      );
    };
  }
}
