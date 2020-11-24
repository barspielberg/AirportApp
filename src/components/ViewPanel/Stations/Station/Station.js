import React, { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { AirportContext } from "../../../../Context/AirportContext";
import "./Station.css";

const Station = ({ stationId, name }) => {
  const { onDrag } = useContext(AirportContext);
  const boxRef = useRef();

  const onDragHandler = (event, obj) => {
    onDrag();
    localStorage.setItem(stationId, JSON.stringify({ x: obj.x, y: obj.y }));
  };

  let position = JSON.parse(localStorage.getItem(stationId));

  if (!position) {
    position = {
      x: Math.round(Math.random() * 700) + 50,
      y: Math.round(Math.random() * 400) + 50,
    };
  }

  return (
    <Draggable
      nodeRef={boxRef}
      bounds="parent"
      onDrag={onDragHandler}
      defaultPosition={position}
    >
      <div ref={boxRef} className="station" id={stationId}>
        {name}
      </div>
    </Draggable>
  );
};

export default Station;
