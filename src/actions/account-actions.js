import { appStore, loginStore } from "../stores";
import * as accountService from "../services/account-service";
import history from "../utils/history";

export const login = async request => {
  const response = await accountService.login(request);
  if (!response.hasError) {
    localStorage.setItem("token", response.payload.id);

    appStore.addUser(response.payload);
    history.push("/");
  } else {
    loginStore.addError(response.errors);
  }
};

export const init = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await accountService.loginWithToken(token);
    if (!response.hasError) {
      appStore.addUser(response.payload);
      history.push("/");
    }
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  appStore.addUser(null);
};

export const saveUserHistory = async currentGame => {
  appStore.user.history.push(currentGame);

  const response = await accountService.saveUserHistory(appStore.user);

  if (!response.hasError) {
    appStore.addUser(response.payload);
  }
};
