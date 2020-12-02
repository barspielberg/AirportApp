import React, { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { AirportContext } from "../../../../Context/AirportContext";
import { selectStation } from "../../../../redux/actions/editActions";
import "./Station.css";

const Station = ({ stationId, name, onClick, selectedStation }) => {
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

  let classes = ["station"];
  if (selectedStation && selectedStation.id === stationId) {
    classes.push("station-selected");
  } else classes = ["station"];

  return (
    <Draggable
      nodeRef={boxRef}
      bounds="parent"
      onDrag={onDragHandler}
      defaultPosition={position}
    >
      <div
        ref={boxRef}
        className={classes.join(" ")}
        id={stationId}
        onClick={onClickHandler}
      >
        {name}
      </div>
    </Draggable>
  );
};
const mapStateToProps = (state) => ({
  selectedStation: state.edit.selectedStation,
});
const mapDispatchToProps = (dispatch) => ({
  onClick: (station) => dispatch(selectStation(station)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Station);
