import React, { useState } from "react";

export const AirportContext = React.createContext({
  connection: {},
  setConnection: () => {},
  change: 0,
  onDrag: () => {},
});

const AirportContextProvider = (props) => {
  const [change, SetChange] = useState(0);
  const [connection, setConnection] = useState(null);

  return (
    <AirportContext.Provider
      value={{
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
