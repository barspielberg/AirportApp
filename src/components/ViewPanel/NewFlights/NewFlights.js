import Axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";
import { AirportContext } from "../../../Context/AirportContext";
import Flight from "./Flight/Flight";
import "./NewFlights.css";

const NewFlights = ({ towerId }) => {
  const panelRef = useRef();
  const [flights, setFlights] = useState([]);
  const { connection, connected } = useContext(AirportContext);

  const onDragHandler = (event, obj) => {
    localStorage.setItem(
      "new-flights-panel-location",
      JSON.stringify({ x: obj.x, y: obj.y })
    );
  };

  const position = JSON.parse(localStorage.getItem("new-flights-panel-location"));

  const addFlight = useCallback(
    (flight) => {
      flight.date = new Date(flight.date);
      setFlights([...flights, flight]);
    },
    [flights, setFlights]
  );

  const removeFlight = useCallback(
    (flight) => {
      setFlights(flights.filter((f) => f.id !== flight.id));
    },
    [setFlights, flights]
  );

  useEffect(() => {
    if (towerId) {
      Axios.get("UnfulfilledFlightsForControlTower/" + towerId)
        .then((res) => {
          const mapedFlights = res.data.map((f) => {
            f.date = new Date(f.date);
            return f;
          });
          setFlights(mapedFlights);
        })
        .catch(console.log);
    }
  }, [setFlights, towerId]);

  useEffect(() => {
    if (connection && connected) {
      connection.on("newFlight", addFlight);
    }
    return () => {
      if (connection) connection.off("newFlight", addFlight);
    };
  }, [connection, connected, addFlight]);

  useEffect(() => {
    if (connection && connected) {
      connection.on("planeSended", removeFlight);
    }
    return () => {
      if (connection) connection.off("planeSended", removeFlight);
    };
  }, [connection, connected, removeFlight]);

  return (
    <Draggable nodeRef={panelRef} onDrag={onDragHandler} defaultPosition={position}>
      <div ref={panelRef} className="new-flights-view-panel">
        <div className="description">Future flights</div>
        <table className="darkTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>landing/takeoff</th>
            </tr>
          </thead>
          <tbody>
            {flights
              .sort((a, b) => a.date - b.date)
              .map((f) => (
                <Flight key={f.id} {...f} />
              ))}
          </tbody>
        </table>
      </div>
    </Draggable>
  );
};

export default NewFlights;
