import React from "react";
import { connect } from "react-redux";
import Arrows from "./Arrows/Arrows";
import ControlTowers from "./ControlTowers/ControlTowers";
import NewFlights from "./NewFlights/NewFlights";
import Planes from "./Planes/Planes";
import Stations from "./Stations/Stations";
import "./ViewPanel.css";

const ViewPanel = ({ towerId }) => {
  return (
    <div className="view-panel" id={towerId}>
      <Arrows />
      <Stations />
      <Planes />
      <ControlTowers />
      <NewFlights towerId={towerId} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  towerId: state.controlTowers.selected.id,
});

export default connect(mapStateToProps)(ViewPanel);
