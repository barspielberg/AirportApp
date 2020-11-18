import React, { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { AirportContext } from "../../../../Context/AirportContext";
import "./Station.css";

const Station = ({stationId}) => {
  const {onDrag} = useContext(AirportContext);
  const boxRef = useRef();
  return (
    <Draggable nodeRef={boxRef} bounds="parent" onDrag={onDrag}>
      <div ref={boxRef} className='station' id={stationId}></div>
    </Draggable>
  );
};

export default Station;
