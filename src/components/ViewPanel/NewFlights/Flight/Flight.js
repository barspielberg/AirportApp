import React from "react";

const Flight = ({ date, name, direction }) => {
  return (
    <tr>
      <td style={{ color: new Date() > date ? "red" : "yellow" }}>
        {date?.toLocaleString()||'failed'}
      </td>
      <td>{name}</td>
      <td style={{ color: direction ? "#6be270" : "#e91e63" }}>
        {direction ? "Landing" : "TakeOff"}
      </td>
    </tr>
  );
};

export default Flight;
