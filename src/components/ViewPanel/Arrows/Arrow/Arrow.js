import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import Xarrow from "react-xarrows/lib";
import { AirportContext } from "../../../../Context/AirportContext";
import { selectConnection } from "../../../../redux/actions/editActions";
import "./Arrow.css";

const Arrow = ({ from, to, direction, edit, onClick, selectedArrow }) => {
  const [selected, setSelected] = useState(false);
  const { change } = useContext(AirportContext);
  const onClickHandler = (e) => {
    if (onClick) onClick({ from, to, direction });
  };

  useEffect(() => {
    setSelected(
      edit && selectedArrow?.from === from && selectedArrow?.to === to
    );
  }, [setSelected, selectedArrow, from, to,edit]);

  return (
    <Xarrow
      start={from}
      end={to}
      change={change}
      color={direction ? "#6be270" : "#e91e63"}
      path="straight"
      dashness={edit ? false : { animation: 1 }}
      strokeWidth={edit ? 6 : 4}
      divContainerProps={{ className: selected ? "arrow-selected" : "" }}
      arrowHeadProps={edit && { onClick: onClickHandler, cursor: "pointer" }}
      arrowBodyProps={edit && { onClick: onClickHandler, cursor: "pointer" }}
    />
  );
};
const mapStateToProps = (state) => ({
  selectedArrow: state.edit.selectedConnection,
});
const mapDispatchToProps = (dispatch) => ({
  onClick: (connection) => dispatch(selectConnection(connection)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Arrow);
