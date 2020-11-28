import Axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";
import AirportContextProvider from "./Context/AirportContext";
import "./index.css";
import mainReducer from "./redux/reducers/mainReducer";

import reportWebVitals from "./reportWebVitals";

Axios.defaults.baseURL = "http://localhost:52961/api/Airport/";//TODO Add interceptor for catching errors

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
