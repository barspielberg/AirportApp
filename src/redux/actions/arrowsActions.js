import Axios from "axios";

export const INIT_ARROWS = "INIT_ARROWS";
export const ADD_ARROWS_SUCCEEDED = "ADD_ARROWS_SUCCEEDED";
export const DELETE_ARROWS_SUCCEEDED = "DELETE_ARROWS_SUCCEEDED";

export const getRelationsForControlTower = (towerId) => (dispatch) => {
  Axios.get("RelationsForControlTower/" + towerId)
    .then((res) => dispatch(initArrows(res.data)))
    .catch(console.log);
};


export const AddNewArrow = (arrow) => (dispatch) => {
  Axios.post("Relation/", arrow)
    .then((res) => dispatch(addNewArrowSucceeded(res.data)))
    .catch(console.log);
};
export const DeleteArrow = (arrow) => (dispatch) => {
  Axios.post("DeleteRelation/", arrow)
    .then((res) => dispatch(deleteArrowSucceeded(res.data)))
    .catch(console.log);
};

export const initArrows = (arrows) => ({
  type: INIT_ARROWS,
  arrows,
});

const addNewArrowSucceeded = (arrow) => ({
  type: ADD_ARROWS_SUCCEEDED,
  arrow,
});
const deleteArrowSucceeded = (arrow) => ({
  type: DELETE_ARROWS_SUCCEEDED,
  arrow,
});
