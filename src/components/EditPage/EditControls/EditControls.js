import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AddNewArrow,
  DeleteArrow,
} from "../../../redux/actions/arrowsActions";
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
  onAddNewArrow,
  onDeleteArrow,
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
      {selectedConnection && (
        <EditArrow
          onDelete={onDeleteArrow}
          {...selectedConnection}
        />
      )}
      <hr />
      <EditTower onSubmit={onAddNewcontrolTower} isAddNew />
      <EditStation isAddNew onSubmit={onAddNewStationHandler} />
      <EditArrow isAddNew onSubmit={onAddNewArrow} />
      <button className="nav-btn" onClick={() => history.push("/")}>
        go back to real time airport ➧
      </button>
    </div> //TODO Add popup "are you sure?" window
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

  onAddNewArrow: (arrow) => dispatch(AddNewArrow(arrow)),
  onDeleteArrow: (arrow) => dispatch(DeleteArrow(arrow)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
