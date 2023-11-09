module.exports = (app) => {
  // path:路径
  // callback:回调
  app.use(require("./login"));
  app.use(require("./register"));
  app.use(require("./getUserInfo"));
  app.use(require("./editUserInfo"));
  app.use(require("./signIn"));
  app.use(require("./getSignInList"));
  app.use(require("./addCredit"));
  app.use(require("./getAddCredit"));
};
