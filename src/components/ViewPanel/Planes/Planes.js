import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AirportContext } from "../../../Context/AirportContext";
import { getActiveFlightsForControlTower, planeSended } from "../../../redux/actions/planesActions";
import Plane from "./Plane/Plane";
import "./Planes.css";

const Planes = ({ data, towerId, getPlanes, addPlane }) => {
  const { connection, connected } = useContext(AirportContext);
  
  useEffect(() => {
    if (towerId) getPlanes(towerId);
  }, [towerId, getPlanes]);


  useEffect(() => {
    if (connection && connected) {
      connection.on("planeSended", addPlane);
    }
    return () => {
      if (connection) connection.off("planeSended", addPlane);
    };
  }, [connection, connected, addPlane]);

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
});

const mapDispatchToProps = (dispatch) => ({
  getPlanes: (towerId) => dispatch(getActiveFlightsForControlTower(towerId)),
  addPlane: (plane) => dispatch(planeSended(plane)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Planes);
