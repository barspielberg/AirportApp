import React from "react";
import Arrow from "./Arrow/Arrow";

const Arrows = ({ data }) => {
  return data.map((a) => (
    <Arrow
      key={a.fromId + "_" + a.toId}
      from={a.fromId}
      to={a.toId}
      direction={a.direction}
    />
  ));
};

export default Arrows;
