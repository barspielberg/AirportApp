import { INIT_ARROWS } from "../actions/arrowsActions";

const initialState = [];

const arrowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ARROWS:
     return action.arrows

    default:
      return state;
  }
};

export default arrowsReducer;
