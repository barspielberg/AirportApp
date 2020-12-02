import {
  CLEAR_SELECTED_STATION,
  SELECT_CONNECTION,
  SELECT_STATION,
} from "../actions/editActions";

const initialState = { selectedStation: null, selectedConnection: null };

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STATION:
      return {
        ...state,
        selectedStation: action.station,
        selectedConnection: null,
      };
    case SELECT_CONNECTION:
      return {
        ...state,
        selectedConnection: action.connection,
        selectedStation: null,
      };
    case CLEAR_SELECTED_STATION:
      return { ...state, selectedStation: null };
    default:
      return state;
  }
};

export default editReducer;
