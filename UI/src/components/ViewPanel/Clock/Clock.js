import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <div
      style={{
        textAlign: "center",
        fontWeight: "600",
        fontSize: "larger",
        textShadow: "1px 1px 1px black",
        letterSpacing:"0.5px",
        color: "white",
      }}
    >
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
