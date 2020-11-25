import React, { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { AirportContext } from "../../../../Context/AirportContext";
import { selectStation } from "../../../../redux/actions/editActions";
import "./Station.css";

const Station = ({ stationId, name, onClick }) => {
  const { onDrag } = useContext(AirportContext);
  const boxRef = useRef();

  const onDragHandler = (event, obj) => {
    onDrag();
    localStorage.setItem(stationId, JSON.stringify({ x: obj.x, y: obj.y }));
  };

  const onClickHandler = (e) => {
    if (onClick) onClick({ name, id: stationId });
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
      <div
        ref={boxRef}
        className="station"
        id={stationId}
        onClick={onClickHandler}
      >
        {name}
      </div>
    </Draggable>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (station) => dispatch(selectStation(station)),
});
export default connect(null, mapDispatchToProps)(Station);
