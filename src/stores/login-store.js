import { observable, action, decorate } from "mobx";

class LoginStore {
  userName;
  password;
  error;

  constructor() {
    this.init();
  }

  init = () => {
    this.userName = "";
    this.password = "";
    this.error = null;
  };

  addGuestUser = guest => {
    this.guest = guest;
  };

  addUser = user => {
    this.user = user;
  };

  onUserNameChanged = userName => {
    this.userName = userName;
    this.error = null;
  };

  onPasswordChanged = password => {
    this.password = password;
    this.error = null;
  };

  addError = error => {
    this.error = error;
  };
}

decorate(LoginStore, {
  userName: observable,
  password: observable,
  error: observable,
  onUserNameChanged: action,
  onPasswordChanged: action,
  addError: action
});

const loginStore = new LoginStore();

export default loginStore;
