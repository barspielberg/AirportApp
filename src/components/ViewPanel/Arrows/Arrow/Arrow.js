import React, { useContext } from "react";
import Xarrow from "react-xarrows/lib";
import { AirportContext } from "../../../../Context/AirportContext";
import "./Arrow.css";

const Arrow = ({ from, to }) => {
    const {change} = useContext(AirportContext);
  return <Xarrow start={from} end={to} change={change}/>;
};

export default Arrow;
