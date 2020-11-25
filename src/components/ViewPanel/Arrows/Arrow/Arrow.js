import React, { useContext } from "react";
import { connect } from "react-redux";
import Xarrow from "react-xarrows/lib";
import { AirportContext } from "../../../../Context/AirportContext";
import { selectConnection } from "../../../../redux/actions/editActions";
import "./Arrow.css";

const Arrow = ({ from, to, direction, edit, onClick }) => {
  const { change } = useContext(AirportContext);
  const onClickHandler = (e) => {
    if (onClick) onClick({ from, to, direction });
  };

  return (
    <Xarrow
      start={from}
      end={to}
      change={change}
      color={direction ? "#6be270" : "#e91e63"}
      path="straight"
      dashness={edit ? false : { animation: 1 }}
      strokeWidth={edit ? 6 : 4}
      arrowHeadProps={edit && { onClick: onClickHandler, cursor: "pointer" }}
      arrowBodyProps={edit && { onClick: onClickHandler, cursor: "pointer" }}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (connection) => dispatch(selectConnection(connection)),
});
export default connect(null, mapDispatchToProps)(Arrow);
