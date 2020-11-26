import Axios from "axios";

export const INIT_TOWERS = "INIT_TOWERS";
export const SELECT_TOWER = "SELECT_TOWER";
export const UPDATE_CONTROL_TOWER_SUCCEEDED = "UPDATE_CONTROL_TOWER_SUCCEEDED";
export const ADD_CONTROL_TOWER_SUCCEEDED = "ADD_CONTROL_TOWER_SUCCEEDED";
export const DELETE_CONTROL_TOWER_SUCCEEDED = "DELETE_CONTROL_TOWER_SUCCEEDED";

export const getControlTowers = () => (dispatch) => {
  Axios.get("ControlTowers/")
    .then((res) => dispatch(initControlTowers(res.data)))
    .catch(console.log);
};

export const UpdateCntrolTower = (controlTower) => (dispatch) => {
  Axios.put("ControlTower/" + controlTower.id, controlTower)
    .then((res) => dispatch(updateCntrolTowerSucceeded(res.data)))
    .catch(console.log);
};

export const AddNewCntrolTower = (controlTower) => (dispatch) => {
  Axios.post("ControlTower/", controlTower)
    .then((res) => {
      dispatch(addNewCntrolTowerSucceeded(res.data));
      dispatch(selectTower(res.data.id));
    })
    .catch(console.log);
};
export const DeleteCntrolTower = (towerId) => (dispatch) => {
  Axios.delete("ControlTower/" + towerId)
    .then((res) => dispatch(deleteCntrolTowerSucceeded(res.data)))
    .catch(console.log);
};

export const selectTower = (towerId) => ({
  type: SELECT_TOWER,
  towerId,
});

const initControlTowers = (towers) => ({
  type: INIT_TOWERS,
  towers,
});

const updateCntrolTowerSucceeded = (controlTower) => ({
  type: UPDATE_CONTROL_TOWER_SUCCEEDED,
  controlTower,
});

const addNewCntrolTowerSucceeded = (controlTower) => ({
  type: ADD_CONTROL_TOWER_SUCCEEDED,
  controlTower,
});
const deleteCntrolTowerSucceeded = (controlTower) => ({
  type: DELETE_CONTROL_TOWER_SUCCEEDED,
  towerId: controlTower.id,
});
