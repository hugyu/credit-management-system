// 用户模块

import { makeAutoObservable } from "mobx";
// import { http } from "../common/utils";

class UserStore {
  userInfo = "";
  constructor() {
    makeAutoObservable(this);
  }

  async getUserInfo() {
    // const res = await http.get("/user");
    this.userInfo = 'csa';
  }
}

export default UserStore;
