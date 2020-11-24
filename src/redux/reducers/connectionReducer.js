import { SET_CONNECTED, SET_CONNECTION } from "../actions/connectionActions";

const initialState = { connection: null, connected: false };

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTION:
      return { ...state, connection: action.connection };
    case SET_CONNECTED:
      return { ...state, connected: action.connected };

    default:
      return state;
  }
};

export default connectionReducer;
