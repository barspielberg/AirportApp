import React from "react";
import { connect } from "react-redux";
import Arrows from "../../ViewPanel/Arrows/Arrows";
import ControlTowers from "../../ViewPanel/ControlTowers/ControlTowers";
import Stations from "../../ViewPanel/Stations/Stations";
import "./EditView.css";
import gridImg from '../../../img/grid.jpg';

const EditView = ({ towerId }) => {
  return (
    <div className="edit-view" id={towerId} style={{background:`url(${gridImg}) no-repeat center`, backgroundSize:"100% 100%"}}>
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
