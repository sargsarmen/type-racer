import { appStore, loginStore } from "../stores";
import * as accountService from "../services/account-service";
import { requestStore } from "../stores";
import * as requestTypes from "../constants/request-types";
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
  requestStore.setRequestInProcess(requestTypes.INIT_APP, true);
  const token = localStorage.getItem("token");

  if (token) {
    const response = await accountService.loginWithToken(token);
    if (!response.hasError) {
      appStore.addUser(response.payload);
      history.push("/");
    }
  }

  requestStore.setRequestInProcess(requestTypes.INIT_APP, false);
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
