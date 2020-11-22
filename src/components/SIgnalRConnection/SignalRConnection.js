import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useContext, useEffect, useState } from "react";
import { AirportContext } from "../../Context/AirportContext";
import "./SignalRConnection.css";

const SignalRConnection = () => {
  const { setConnection, connection, setConnected } = useContext(
    AirportContext
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const newConncetion = new HubConnectionBuilder()
      .withUrl("http://localhost:52961/FlightsHub")
      .build();

    setConnection(newConncetion);
  }, [setConnection]);

  useEffect(() => {
    if (connection) {
      setLoading(true);
      connection
        .start()
        .then(() => {
          if (connection.state === "Connected") {
            setConnected(true);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [connection, setConnected, setConnection]);

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

export default SignalRConnection;
