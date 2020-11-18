import React from "react";
import Station from "./Station/Station";

const Stations = ({ data }) => {
  return data.map((s) => <Station key={s} stationId={s} />);
};

export default Stations;
