import Axios from "axios";

export const INIT_ARROWS = "INIT_ARROWS";

export const getRelationsForControlTower = (towerId) => (dispatch) => {
  Axios.get("RelationsForControlTower/" + towerId)
    .then((res) => dispatch(initArrows(res.data)))
    .catch(console.log);
};

export const initArrows = (arrows) => ({
  type: INIT_ARROWS,
  arrows,
});
