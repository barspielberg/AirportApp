import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AddNewCntrolTower,
  DeleteCntrolTower,
  UpdateCntrolTower,
} from "../../../redux/actions/controlTowersActions";
import {
  AddNewStation,
  DeleteStation,
  UpdateStation,
} from "../../../redux/actions/stationsActions";
import EditArrow from "./EditArrow/EditArrow";
import "./EditControls.css";
import EditStation from "./EditStation/EditStation";
import EditTower from "./EditTower/EditTower";

const EditControls = ({
  selectedTower,
  selectedStation,
  selectedConnection,
  onUpdateControlTower,
  onAddNewcontrolTower,
  onDeleteControlTower,
  onUpdateStation,
  onAddNewStation,
  onDeleteStation,
}) => {
  const history = useHistory();

  const onAddNewStationHandler = (station) => {
    station.controlTowerId = selectedTower.id;
    onAddNewStation(station);
  };
  return (
    <div className="edit-controls">
      {selectedTower && (
        <EditTower
          onSubmit={onUpdateControlTower}
          onDelete={onDeleteControlTower}
          {...selectedTower}
        />
      )}
      {selectedStation && (
        <EditStation
          onSubmit={onUpdateStation}
          onDelete={onDeleteStation}
          {...selectedStation}
        />
      )}
      {selectedConnection && <EditArrow {...selectedConnection} />}
      <hr />
      <EditTower onSubmit={onAddNewcontrolTower} isAddNew />
      <EditStation isAddNew onSubmit={onAddNewStationHandler} />
      <EditArrow isAddNew />
      <button className="nav-btn" onClick={() => history.push("/")}>
        go back to real time airport ➧
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedTower: state.controlTowers.selected,
  selectedStation: state.edit.selectedStation,
  selectedConnection: state.edit.selectedConnection,
});
const mapDispatchToProps = (dispatch) => ({
  onUpdateControlTower: (controlTower) =>
    dispatch(UpdateCntrolTower(controlTower)),
  onAddNewcontrolTower: (controlTower) =>
    dispatch(AddNewCntrolTower(controlTower)),
  onDeleteControlTower: (towerId) => dispatch(DeleteCntrolTower(towerId)),
  onUpdateStation: (station) => dispatch(UpdateStation(station)),
  onAddNewStation: (station) => dispatch(AddNewStation(station)),
  onDeleteStation: (stationId) => dispatch(DeleteStation(stationId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
