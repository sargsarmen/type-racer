export default class ServiceResponse {
  constructor() {
    this.errors = [];
    this.payload = null;
  }

  get hasError() {
    return this.errors.length > 0;
  }

  addError(message) {
    this.errors.push(message);
  }
}
