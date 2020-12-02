import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStationsForControlTower } from "../../../redux/actions/stationsActions";
import Station from "./Station/Station";

const Stations = ({ data, towerId, getStations }) => {
  useEffect(() => {
    if (towerId) getStations(towerId);
  }, [towerId, getStations]);

  return data.map((s) => <Station key={s.id} stationId={s.id} name={s.name}/>);
};

const mapStateToProps = (state) => ({
  data: state.stations,
  towerId: state.controlTowers.selected.id,
});

const mapDispatchToProps = (dispatch) => ({
  getStations: (towerId) => dispatch(getStationsForControlTower(towerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Stations);
