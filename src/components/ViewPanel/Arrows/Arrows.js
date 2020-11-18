import React from "react";
import Arrow from "./Arrow/Arrow";

const Arrows = ({ data }) => {
  return data.map((a) => <Arrow key={a.from + "_" + a.to} {...a} />);
};

export default Arrows;
