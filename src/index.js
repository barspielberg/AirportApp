import Axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";
import AirportContextProvider from "./Context/AirportContext";
import "./index.css";
import mainReducer from "./redux/reducers/mainReducer";

import reportWebVitals from "./reportWebVitals";

Axios.defaults.baseURL = "http://localhost:52961/api/Airport/";

const store = createStore(mainReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AirportContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AirportContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
