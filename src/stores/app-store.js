import { observable, computed, action, decorate } from "mobx";

class AppStore {
  user = null;

  get isAuthenticated() {
    return this.user !== null;
  }

  get userName() {
    return this.user !== null ? this.user.name : "";
  }

  addUser = user => {
    this.user = user;
  };
}

decorate(AppStore, {
  user: observable,
  isAuthenticated: computed,
  addUser: action
});

const appStore = new AppStore();

export default appStore;
