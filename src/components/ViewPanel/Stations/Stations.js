import React from "react";
import Station from "./Station/Station";

const Stations = ({ data }) => {
  return data.map((s) => <Station key={s.id} stationId={s.id} name={s.name}/>);
};

export default Stations;
