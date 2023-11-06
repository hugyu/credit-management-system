import { makeAutoObservable } from "mobx";
import { clearToken, getToken } from "../common/token";


class LoginStore {
  token = getToken() || "";
  constructor() {
    makeAutoObservable(this);
  }



  loginOut = () => {
    this.token = "";
    clearToken();
  };
}
export default LoginStore;
