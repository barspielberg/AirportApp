import React, { useContext } from "react";
import Xarrow from "react-xarrows/lib";
import { AirportContext } from "../../../../Context/AirportContext";
import "./Arrow.css";

const Arrow = ({ from, to, direction }) => {
  const { change } = useContext(AirportContext);
  return (
    <Xarrow
      start={from}
      end={to}
      change={change}
      color={direction ? "#6be270" : "#e91e63"}
      path="straight"
    />
  );
};

export default Arrow;
