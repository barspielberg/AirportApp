import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getActiveFlightsForControlTower,
  planeSended,
} from "../../../redux/actions/planesActions";
import Plane from "./Plane/Plane";
import "./Planes.css";

const Planes = ({
  data,
  towerId,
  getPlanes,
  addPlane,
  connection,
  connected,
  stations,
}) => {
  useEffect(() => {
    if (towerId && stations.length > 0) getPlanes(towerId);
  }, [towerId, getPlanes, stations]);

  useEffect(() => {
    if (connection && connected && towerId) {
      connection.send("JoinGroup", towerId).catch(console.log);
      connection.on("planeSended", addPlane);
    }
    return () => {
      if (connection) {
        connection.off("planeSended", addPlane);
        if (towerId)
          connection.send("LeaveGroup", towerId).catch(console.log);
      }
    };
  }, [connection, connected, addPlane, towerId]);
  return (
    <TransitionGroup>
      {data.map((p) => (
        <CSSTransition key={p.id} classNames="fade" timeout={500}>
          <div>
            <Plane
              stationId={p.stationId}
              name={p.name}
              direction={p.direction}
            />
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  data: state.planes.planes,
  towerId: state.controlTowers.selected.id,
  connection: state.connection.connection,
  connected: state.connection.connected,
  stations: state.stations,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanes: (towerId) => dispatch(getActiveFlightsForControlTower(towerId)),
  addPlane: (plane) => dispatch(planeSended(plane)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Planes);
