import React from "react";
import "./ControlTowers.css";

const ControlTowers = ({ data }) => {
  return (
    <select className="control-twoer-select" onChange={console.log}>
      {data.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}
    </select>
  );
};

export default ControlTowers;
