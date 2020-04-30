'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = (ctx, pluginOpts) => {
  ctx.modifyBuildAssets(args => {});

  ctx.onBuildFinish(async () => {
    console.log(111);
  });
};
