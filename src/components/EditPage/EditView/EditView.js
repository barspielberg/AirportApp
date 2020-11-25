import React from "react";
import { connect } from "react-redux";
import Arrows from "../../ViewPanel/Arrows/Arrows";
import ControlTowers from "../../ViewPanel/ControlTowers/ControlTowers";
import Stations from "../../ViewPanel/Stations/Stations";
import "./EditView.css";

const EditView = ({ towerId }) => {
  return (
    <div className="edit-view" id={towerId}>
      <Arrows edit />
      <Stations />
      <ControlTowers />
    </div>
  );
};
const mapStateToProps = (state) => ({
  towerId: state.controlTowers.selected.id,
});
export default connect(mapStateToProps)(EditView);
