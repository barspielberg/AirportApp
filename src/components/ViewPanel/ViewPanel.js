import React, { useContext, useEffect, useState } from "react";
import { AirportContext } from "../../Context/AirportContext";
import Arrows from "./Arrows/Arrows";
import Planes from "./Planes/Planes";
import Stations from "./Stations/Stations";
import "./ViewPanel.css";

const ViewPanel = () => {
  const [stations, setStations] = useState([1, 2, 3, 4]);
  const [arrows, setArrows] = useState([
    { from: "1", to: "2" },
    { from: "2", to: "3" },
    { from: "3", to: "4" },
  ]);
  const [planes, setPlanes] = useState([1, 2, 3]);
  const [towers, setTowers] = useState([]);

  const { connection } = useContext(AirportContext);

  useEffect(() => {
    if (connection) {
      connection
        .invoke("GetControlTowers")
        .then(setTowers)
        .catch(console.log);
    }
  }, [connection]);

  return (
    <div className="view-panel">
      <Stations data={stations} />
      <Arrows data={arrows} />
      <Planes data={planes} />
      <button onClick={() => setPlanes(planes.map((p) => p + 1))}>move</button>
    </div>
  );
};

export default ViewPanel;
