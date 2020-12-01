import React from "react";
import { connect } from "react-redux";
import { dismissError } from "../../redux/actions/connectionActions";
import "./ConnectionErrorWindow.css";

const ConnectionErrorWindow = ({ message, close }) => {
  return message ? (
    <div className="connection-error-window">
      <div className="connection-error-title">Error ❗❗</div>
      <div className="connection-error-msg">{message}</div>
      <div>
        <button onClick={close}>OK</button>
      </div>
    </div>
  ) : null;
};


const mapStateToProps = (state) => ({
    message : state.connection.error,
  });
  const mapDispatchToProps = (dispatch) => ({
    close: ()=>dispatch(dismissError())
  })
export default connect(mapStateToProps,mapDispatchToProps)( ConnectionErrorWindow);
