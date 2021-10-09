import "./index.scss";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
