import React from "react";

const StationLog = ({ date, direction, flight, enter }) => {
  if (flight.length > 15) {
    flight = flight.substr(0, 13) + "...";
  }

  return (
    <tr>
      <td style={{ color: "yellow" }}>{date.toLocaleString()}</td>
      <td style={{ color: direction ? "#6be270" : "#e91e63" }}>
        {direction ? "Takeoff" : "Landing"}
      </td>
      <td>{flight}</td>
      <td>{enter ? "Enter" : "exit"}</td>
    </tr>
  );
};

export default StationLog;
