import React from "react";
import { connect } from "react-redux";
import Arrows from "./Arrows/Arrows";
import Clock from "./Clock/Clock";
import ControlTowers from "./ControlTowers/ControlTowers";
import NewFlights from "./NewFlights/NewFlights";
import Planes from "./Planes/Planes";
import Stations from "./Stations/Stations";
import "./ViewPanel.css";
import gridImg from "../../img/grid.jpg";
import StationLogs from "./StationLogs/StationLogs";

const ViewPanel = ({ towerId, selectedStation, history }) => {
  return (
    <div
      className="view-panel"
      id={towerId}
      style={{
        background: `url(${gridImg}) no-repeat center`,
        backgroundSize: "100% 100%",
      }}
    >
      <Arrows />
      <Stations />
      <Planes />
      <ControlTowers />
      <NewFlights />
      {selectedStation && <StationLogs selectedStation={selectedStation} />}
      <Clock />
      <button className="nav-btn" onClick={() => history.push("/edit")}>
        edit ➧
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  towerId: state.controlTowers.selected.id,
  selectedStation: state.edit.selectedStation,
});

export default connect(mapStateToProps)(ViewPanel);
