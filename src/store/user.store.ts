// 用户模块

import { makeAutoObservable } from "mobx";

class UserStore {
  username = "";
  constructor() {
    makeAutoObservable(this);
  }
  async setUserInfo(username: string) {
    this.username = username;
  }
  getUserInfo() {
    return this.username;
  }
}

export default UserStore;
