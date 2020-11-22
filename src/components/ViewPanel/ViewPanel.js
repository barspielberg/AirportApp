import Axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AirportContext } from "../../Context/AirportContext";
import Arrows from "./Arrows/Arrows";
import ControlTowers from "./ControlTowers/ControlTowers";
import Planes from "./Planes/Planes";
import Stations from "./Stations/Stations";
import "./ViewPanel.css";

const ViewPanel = () => {
  const [stations, setStations] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [towers, setTowers] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [towerId, setTowerId] = useState("");

  const { connection, connected } = useContext(AirportContext);

  const newPlane = useCallback(
    (planeId, stationId, direction) => {
      const plane = planes.find((p) => p.id === planeId);
      console.log("plane arrived", planeId, stationId);

      if (stationId === "00000000-0000-0000-0000-000000000000") {
        setPlanes(planes.filter((p) => p.id !== planeId));
      } else if (plane) {
        setPlanes(
          planes.map((p) => {
            if (p.id === planeId) p.stationId = stationId;
            return p;
          })
        );
      } else setPlanes([...planes, { id: planeId, stationId, direction }]);
    },
    [planes, setPlanes]
  );

  //useEffect(() => console.log(planes), [planes]);

  useEffect(() => {
    Axios.get("ControlTowers").then((res) => setTowers(res.data));
  }, [setTowers]);

  useEffect(() => {
    if (towers.length > 0) {
      setTowerId(towers[0].id);
    }
  }, [towers]);

  useEffect(() => {
    if (connection && connected) {
      connection.on("planeSended", newPlane);
    }
    return () => {
      if (connection) connection.off("planeSended");
    };
  }, [connection, connected, newPlane]);

  useEffect(() => {
    if (towerId) {
      Axios.get("StationsForControlTower/" + towerId)
        .then((res) => setStations(res.data))
        .catch(console.log);
      Axios.get("RelationsForControlTower/" + towerId)
        .then((res) => setArrows(res.data))
        .catch(console.log);
    }
  }, [towerId]);

  return (
    <div className="view-panel" id={towerId}>
      <Arrows data={arrows} />
      <Stations data={stations} />
      <Planes data={planes} />
      <ControlTowers data={towers} />
    </div>
  );
};

export default ViewPanel;
