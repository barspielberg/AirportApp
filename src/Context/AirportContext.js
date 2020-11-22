import React, { useState } from "react";

export const AirportContext = React.createContext({
  connected: false,
  setConnected: () => {},
  connection: {},
  setConnection: () => {},
  change: 0,
  onDrag: () => {},
});

const AirportContextProvider = (props) => {
  const [change, SetChange] = useState(0);
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);

  return (
    <AirportContext.Provider
      value={{
        connected,
        setConnected,
        connection,
        setConnection,
        change,
        onDrag: () => {
          SetChange((change + 1) % 2);
        },
      }}
    >
      {props.children}
    </AirportContext.Provider>
  );
};

export default AirportContextProvider;
