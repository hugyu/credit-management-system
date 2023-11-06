import React from "react";
import LoginStore from "./login.store";
import UserStore from "./user.store";

class RootStore {
  loginStore: LoginStore;
  userStore: UserStore;
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore());
export const useStore = () => React.useContext(StoresContext);
