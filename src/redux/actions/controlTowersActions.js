import Axios from "axios";

export const INIT_TOWERS = "INIT_TOWERS";
export const SELECT_TOWER = "SELECT_TOWER";

export const getControlTowers = () => (dispatch) => {
  Axios.get("ControlTowers/")
    .then((res) => dispatch(initControlTowers(res.data)))
    .catch(console.log);
};

export const initControlTowers = (towers) => ({
  type: INIT_TOWERS,
  towers,
});

export const selectTower = (tower) => ({
  type: SELECT_TOWER,
  tower,
});
