import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Plane from "./Plane/Plane";
import "./Planes.css";

const Planes = ({ data }) => {
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

export default Planes;
