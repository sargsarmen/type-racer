import { observable, action, decorate } from "mobx";

class RequestStore {
  requests;

  constructor() {
    this.requests = observable.map({});
  }

  setRequestInProcess = (requestType, inProcess) => {
    this.requests.set(requestType, inProcess);
  };

  getRequestByType(type) {
    return this.requests.get(type);
  }
}

decorate(RequestStore, {
  requests: observable,
  setRequestInProcess: action
});

const requestStore = new RequestStore();

export default requestStore;
