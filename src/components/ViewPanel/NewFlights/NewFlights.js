import React, { useContext, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { AirportContext } from "../../../Context/AirportContext";
import {
  addFutureFlight,
  getUnfulfilledFlightsForControlTower,
} from "../../../redux/actions/planesActions";
import Flight from "./Flight/Flight";
import "./NewFlights.css";

const NewFlights = ({ towerId, getFutureFlights, flights, addFlight }) => {
  const panelRef = useRef();
  const { connection, connected } = useContext(AirportContext);

  const onDragHandler = (event, obj) => {
    localStorage.setItem(
      "new-flights-panel-location",
      JSON.stringify({ x: obj.x, y: obj.y })
    );
  };

  const position = JSON.parse(
    localStorage.getItem("new-flights-panel-location")
  );

  useEffect(() => {
    if (towerId) {
      getFutureFlights(towerId);
    }
  }, [getFutureFlights, towerId]);

  useEffect(() => {
    if (connection && connected) {
      connection.on("newFlight", addFlight);
    }
    return () => {
      if (connection) connection.off("newFlight", addFlight);
    };
  }, [connection, connected, addFlight]);

  return (
    <Draggable
      nodeRef={panelRef}
      onDrag={onDragHandler}
      defaultPosition={position}
    >
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

const mapStateToProps = (state) => ({
  flights: state.planes.futureFlights,
  towerId: state.controlTowers.selected.id,
});

const mapDispatchToProps = (dispatch) => ({
  getFutureFlights: (towerId) =>
    dispatch(getUnfulfilledFlightsForControlTower(towerId)),
  addFlight: (flight) => dispatch(addFutureFlight(flight)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewFlights);
