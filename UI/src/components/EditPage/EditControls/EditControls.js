import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AddNewArrow, DeleteArrow } from "../../../redux/actions/arrowsActions";
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
import AreYouSure from "./AreYouSure/AreYouSure";
import EditArrow from "./EditArrow/EditArrow";
import "./EditControls.css";
import EditStation from "./EditStation/EditStation";
import EditTower from "./EditTower/EditTower";
import ErrorWindow from "./ErrorWindow/ErrorWindow";

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

  const [verification, setVerification] = useState(null);
  const [error, setError] = useState(null);

  const onAddNewStationHandler = (station) => {
    station.controlTowerId = selectedTower.id;
    onAddNewStation(station);
  };

  const deleteHandler = (type, deleteFunc) => {
    setVerification(
      <AreYouSure
        type={type}
        deleteFunc={deleteFunc}
        close={() => setVerification(null)}
      />
    );
  };
  return (
    <div className="edit-controls">
      {selectedTower && (
        <EditTower
          onSubmit={onUpdateControlTower}
          onDelete={(payload) =>
            deleteHandler("airport", () => onDeleteControlTower(payload))
          }
          onError={setError}
          {...selectedTower}
        />
      )}
      {selectedStation && (
        <EditStation
          onSubmit={onUpdateStation}
          onDelete={(payload) =>
            deleteHandler("station", () => onDeleteStation(payload))
          }
          onError={setError}
          {...selectedStation}
        />
      )}
      {selectedConnection && (
        <EditArrow
          onDelete={(payload) =>
            deleteHandler("arrow", () => onDeleteArrow(payload))
          }
          {...selectedConnection}
        />
      )}
      <hr />
      <EditTower onSubmit={onAddNewcontrolTower} isAddNew onError={setError} />
      <EditStation
        isAddNew
        onSubmit={onAddNewStationHandler}
        onError={setError}
      />
      <EditArrow isAddNew onSubmit={onAddNewArrow} onError={setError} />
      <button className="nav-btn" onClick={() => history.push("/")}>
        go back to real time airport ➧
      </button>
      {verification}
      <ErrorWindow message={error} close={() => setError(null)} />
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

  onAddNewArrow: (arrow) => dispatch(AddNewArrow(arrow)),
  onDeleteArrow: (arrow) => dispatch(DeleteArrow(arrow)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
