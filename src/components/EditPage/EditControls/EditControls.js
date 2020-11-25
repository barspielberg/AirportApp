import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import EditArrow from "./EditArrow/EditArrow";
import "./EditControls.css";
import EditStation from "./EditStation/EditStation";
import EditTower from "./EditTower/EditTower";

const EditControls = ({ selectedStation, selectedConnection }) => {
  const history = useHistory();

  return (
    <div className="edit-controls">
      <EditTower />
      {selectedStation && <EditStation {...selectedStation} />}
      {selectedConnection && <EditArrow {...selectedConnection} />}
      <hr />
      <EditTower isAddNew />
      <EditStation isAddNew />
      <EditArrow isAddNew />
      <button className="nav-btn" onClick={() => history.push("/")}>
        go back to real time airport ➧
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedStation: state.edit.selectedStation,
  selectedConnection: state.edit.selectedConnection,
});
export default connect(mapStateToProps)(EditControls);
