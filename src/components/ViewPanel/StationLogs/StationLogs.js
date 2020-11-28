import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { clearSlelectedStation } from "../../../redux/actions/editActions";
import StationLog from "./StationLog/StationLog";

const getStationLogs = (stationId) => {
  return Axios.get("StationLogs/" + stationId);
};

const StationLogs = ({ selectedStation, clearSelection }) => {
  const panelRef = useRef();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (selectedStation) {
      getStationLogs(selectedStation.id)
        .then((res) => setLogs(res.data))
        .catch(console.log);
    } else setLogs([]);
  }, [setLogs, selectedStation]);

  const onDragHandler = (event, obj) => {
    localStorage.setItem(
      "station-log-panel-location",
      JSON.stringify({ x: obj.x, y: obj.y })
    );
  };

  let position = JSON.parse(localStorage.getItem("station-log-panel-location"));
  if (!position) position = { x: 0, y: 0 };

  return (
    <Draggable
      nodeRef={panelRef}
      onDrag={onDragHandler}
      defaultPosition={position}
    >
      <div ref={panelRef} className="log-table-view-panel">
        <div className="description">Station logs</div>
        <button className="esc-btn" onClick={clearSelection}>
          ❌
        </button>
        <table className="darkTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>landing/takeoff</th>
              <th>Flight</th>
              <th>Enter/Exit</th>
            </tr>
          </thead>
          <tbody>
            {logs
              .map((l) => ({ ...l, date: new Date(l.date) }))
              .sort((a, b) => b.date - a.date)
              .map((l) => (
                <StationLog
                  key={l.id}
                  date={l.date}
                  direction={l.flight.direction}
                  flight={l.flight.name}
                  enter={l.toId === selectedStation.id}
                />
              ))}
          </tbody>
        </table>
      </div>
    </Draggable>
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearSelection: () => dispatch(clearSlelectedStation()),
});
export default connect(null, mapDispatchToProps)(StationLogs);
