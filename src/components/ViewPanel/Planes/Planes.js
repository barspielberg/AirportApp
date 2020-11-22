import React from "react";
import Plane from "./Plane/Plane";

const Planes = ({ data }) => {
  return data.map((p) => (
    <Plane key={p.id} stationId={p.stationId} direction={p.direction} />
  ));
};

export default Planes;
