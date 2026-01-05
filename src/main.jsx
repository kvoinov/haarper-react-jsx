import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

window.BASE_URL = "https://haarper.pt/";
window.API_URL = window.BASE_URL + "api";

const rootEl = document.getElementById("root");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
