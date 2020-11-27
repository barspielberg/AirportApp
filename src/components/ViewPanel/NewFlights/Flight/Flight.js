import React, { useEffect, useState } from "react";

const Flight = ({ date, name, direction }) => {
  const [datePassed, setDatePassed] = useState(false);
  if (name.length > 18) {
    name = name.substr(0, 16) + "...";
  }
  useEffect(() => {
    let timeout;
    if (new Date() > date) setDatePassed(true);
    else {
      timeout = setTimeout(() => {
        setDatePassed(true);
      }, date - new Date());
    }
    return () => clearTimeout(timeout);
  }, [setDatePassed, date]);

  return (
    <tr>
      <td style={{ color: datePassed ? "red" : "yellow" }}>
        {date?.toLocaleString() || "failed"}
      </td>
      <td>{name}</td>
      <td style={{ color: direction ? "#6be270" : "#e91e63" }}>
        {direction ? "TakeOff" : "Landing"}
      </td>
    </tr>
  );
};

export default Flight;
