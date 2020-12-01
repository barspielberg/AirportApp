import {
  DISMISS_ERROR,
  SET_CONNECTED,
  SET_CONNECTION,
  SET_ERROR,
} from "../actions/connectionActions";

const initialState = { connection: null, connected: false, error: null };

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTION:
      return { ...state, connection: action.connection };
    case SET_CONNECTED:
      return { ...state, connected: action.connected };
    case SET_ERROR:
      return { ...state, error: action.error };
    case DISMISS_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default connectionReducer;
