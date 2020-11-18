import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AirportContextProvider from "./Context/AirportContext";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <AirportContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AirportContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
