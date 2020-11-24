import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  return <div style={{ textAlign: "center" }}>{time.toLocaleTimeString()}</div>;
};

export default Clock;
