import React from "react";
import "./ErrorWindow.css";

const ErrorWindow = ({ message, close }) => {
  return message ? (
    <div className="error-window">
      <div className="error-title">Error ❗❗</div>
      <div className="error-msg">{message}</div>
      <div>
        <button onClick={close}>OK</button>
      </div>
    </div>
  ) : null;
};

export default ErrorWindow;
