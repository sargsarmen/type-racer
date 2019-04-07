import fetchApi from "../utils/fetch";
import { requestStore } from "../stores";
import * as api from "../constants/api";
import * as requestTypes from "../constants/request-types";
import ServiceResponse from "../utils/service-response";

export const getRandomText = async () => {
  requestStore.setRequestInProcess(requestTypes.GET_RANDOM_TEXT_REQUEST, true);

  const response = new ServiceResponse();

  try {
    const payload = await fetchApi(api.GET_RANDOM_TEXT, {
      method: "GET",
      headers: {}
    });
    if (payload && payload.length > 0) {
      response.payload = payload.join("");
    }
  } catch (err) {
    response.addError(err.message);
  }

  requestStore.setRequestInProcess(requestTypes.GET_RANDOM_TEXT_REQUEST, false);

  return response;
};
