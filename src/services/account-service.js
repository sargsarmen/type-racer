import fetchApi from "../utils/fetch";
import { requestStore } from "../stores";
import * as api from "../constants/api";
import * as requestTypes from "../constants/request-types";
import ServiceResponse from "../utils/service-response";

const users = [
  { id: "cutec", userName: "user1", password: "qwerty" },
  { id: "177x90", userName: "user2", password: "qwerty" }
];

export const login = async request => {
  requestStore.setRequestInProcess(requestTypes.LOGIN_REQUEST, true);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = new ServiceResponse();

      const user = users.find(
        u => u.userName === request.userName && u.password === request.password
      );
      if (user) {
        try {
          const payload = await fetchApi(`${api.GET_USER}${user.id}`, {
            method: "GET",
            headers: {}
          });
          if (payload) {
            response.payload = { id: user.id, ...payload };
          }
        } catch (err) {
          response.addError(err.message);
        }
      } else {
        response.addError("UserName or password is wrong.");
      }

      requestStore.setRequestInProcess(requestTypes.LOGIN_REQUEST, false);
      resolve(response);
    }, 500);
  });
};

export const loginWithToken = async token => {
  requestStore.setRequestInProcess(requestTypes.LOGIN_REQUEST, true);
  const response = new ServiceResponse();

  try {
    const payload = await fetchApi(`${api.GET_USER}${token}`, {
      method: "GET",
      headers: {}
    });
    if (payload) {
      response.payload = { id: token, ...payload };
    }
  } catch (err) {
    response.addError(err.message);
  }

  requestStore.setRequestInProcess(requestTypes.LOGIN_REQUEST, false);

  return response;
};

export const saveUserHistory = async user => {
  requestStore.setRequestInProcess(requestTypes.SAVE_HISTORY_REQUEST, true);

  const response = new ServiceResponse();

  try {
    const payload = await fetchApi(`${api.SAVE_HISTORY}${user.id}`, {
      method: "PUT",
      body: user
    });

    if (payload) {
      response.payload = payload;
    }
  } catch (err) {
    response.addError(err.message);
  }

  requestStore.setRequestInProcess(requestTypes.SAVE_HISTORY_REQUEST, false);

  return response;
};
