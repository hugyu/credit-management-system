module.exports = (app) => {
    // path:路径
    // callback:回调
    app.use(require("./login"));
    app.use(require("./register"));
  };
  