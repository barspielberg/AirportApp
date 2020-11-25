import React from "react";
import { connect } from "react-redux";
import Arrows from "./Arrows/Arrows";
import Clock from "./Clock/Clock";
import ControlTowers from "./ControlTowers/ControlTowers";
import NewFlights from "./NewFlights/NewFlights";
import Planes from "./Planes/Planes";
import Stations from "./Stations/Stations";
import "./ViewPanel.css";

const ViewPanel = ({ towerId, history }) => {
  return (
    <div className="view-panel" id={towerId}>
      <Clock/>
      <Arrows />
      <Stations />
      <Planes />
      <ControlTowers />
      <NewFlights />
      <button className='nav-btn' onClick={()=>history.push('/edit')}>edit ➧</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  towerId: state.controlTowers.selected.id,
});

export default connect(mapStateToProps)(ViewPanel);
