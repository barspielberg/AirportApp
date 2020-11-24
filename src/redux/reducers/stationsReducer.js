import { INIT_STATIONS } from "../actions/stationsActions";

const initialState = [];

const stationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STATIONS:
     return action.stations

    default:
      return state;
  }
};

export default stationsReducer;
