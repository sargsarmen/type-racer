import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import App from "./components";
import * as stores from "./stores";
import "./styles.css";

const AppRouter = () => {
  return (
    <Provider key="provider" {...stores}>
      <App />
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
