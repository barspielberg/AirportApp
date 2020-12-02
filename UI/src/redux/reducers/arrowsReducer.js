import {
  ADD_ARROWS_SUCCEEDED,
  DELETE_ARROWS_SUCCEEDED,
  INIT_ARROWS,
} from "../actions/arrowsActions";

const initialState = [];

const arrowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ARROWS:
      return action.arrows;
    case ADD_ARROWS_SUCCEEDED:
      return [...state, action.arrow];
    case DELETE_ARROWS_SUCCEEDED:
      return state.filter(
        (a) =>
          a.fromId !== action.arrow.fromId ||
          a.toId !== action.arrow.toId ||
          a.direction !== action.arrow.direction
      );

    default:
      return state;
  }
};

export default arrowsReducer;
