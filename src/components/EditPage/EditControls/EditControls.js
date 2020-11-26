import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AddNewCntrolTower,
  UpdateCntrolTower,
} from "../../../redux/actions/controlTowersActions";
import EditArrow from "./EditArrow/EditArrow";
import "./EditControls.css";
import EditStation from "./EditStation/EditStation";
import EditTower from "./EditTower/EditTower";

const EditControls = ({
  selectedTower,
  selectedStation,
  selectedConnection,
  onUpdateControlTower,
  onAddNewcontrolTower
}) => {
  const history = useHistory();

  const onDeleteTower = () => {};

  return (
    <div className="edit-controls">
      {selectedTower && (
        <EditTower
          onSubmit={onUpdateControlTower}
          onDelete={onDeleteTower}
          {...selectedTower}
        />
      )}
      {selectedStation && <EditStation {...selectedStation} />}
      {selectedConnection && <EditArrow {...selectedConnection} />}
      <hr />
      <EditTower onSubmit={onAddNewcontrolTower} isAddNew />
      <EditStation isAddNew />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
