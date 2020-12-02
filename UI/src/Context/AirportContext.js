import React, { useState } from "react";

export const AirportContext = React.createContext({
  change: 0,
  onDrag: () => {},
});

const AirportContextProvider = (props) => {
  const [change, SetChange] = useState(0);

  return (
    <AirportContext.Provider
      value={{
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
