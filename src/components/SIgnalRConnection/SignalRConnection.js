import React, {  useEffect, useState } from "react";
import { connect } from "react-redux";
import { connectToSIngnalR } from "../../redux/actions/connectionActions";
import "./SignalRConnection.css";

const SignalRConnection = ({ connect, connected }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    connect();
    setLoading(true);
  }, [connect, setLoading]);

  useEffect(() => {
    if (connected) setLoading(false);
  }, [connected]);

  let content = (
    <div className="loadingio-spinner-pulse-jbq7w5wlc3">
      <div className="ldio-70lh8kqldqq">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
  if (!loading) content = null;

  return content;
};

const mapStateToProps = (state) => ({
  connected: state.connection.connected,
});

const mapDispatchToProps = (dispatch) => ({
  connect: () => dispatch(connectToSIngnalR()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignalRConnection);
