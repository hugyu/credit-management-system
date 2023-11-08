// 用户模块

import { getToken } from "../common/token";
import { makeAutoObservable } from "mobx";

class UserStore {
  username = getToken() || "";
  userPhone = "";
  userAddress = "";
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
