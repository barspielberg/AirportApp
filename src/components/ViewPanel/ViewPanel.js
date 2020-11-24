import Axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AirportContext } from "../../Context/AirportContext";
import Arrows from "./Arrows/Arrows";
import ControlTowers from "./ControlTowers/ControlTowers";
import NewFlights from "./NewFlights/NewFlights";
import Planes from "./Planes/Planes";
import Stations from "./Stations/Stations";
import "./ViewPanel.css";

const guidEmpty = "00000000-0000-0000-0000-000000000000";

const ViewPanel = () => {
  const [stations, setStations] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [towers, setTowers] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [towerId, setTowerId] = useState("");

  const { connection, connected } = useContext(AirportContext);

  const newPlane = useCallback(
    (flight) => {
      const plane = planes.find((p) => p.id === flight.id);
      console.log("plane arrived", flight.id, flight.name, flight.stationId);

      if (flight.stationId === guidEmpty) {
        setPlanes(planes.filter((p) => p.id !== flight.id));
      } else if (plane) {
        setPlanes(
          planes.map((p) => {
            if (p.id === flight.id) p.stationId = flight.stationId;
            return p;
          })
        );
      } else setPlanes([...planes, { ...flight }]);
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
      if (connection) connection.off("planeSended",newPlane);
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
      Axios.get("ActiveFlightsForControlTower/" + towerId)
        .then((res) => setPlanes(res.data))
        .catch(console.log);
    }
  }, [towerId]);

  return (
    <div className="view-panel" id={towerId}>
      <Arrows data={arrows} />
      <Stations data={stations} />
      <Planes data={planes} />
      <ControlTowers data={towers} />
      <NewFlights towerId={towerId}/>
    </div>
  );
};

export default ViewPanel;
