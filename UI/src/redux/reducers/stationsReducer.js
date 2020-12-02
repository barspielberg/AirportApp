import {
  ADD_STATION_SUCCEEDED,
  DELETE_STATION_SUCCEEDED,
  INIT_STATIONS,
  UPDATE_STATION_SUCCEEDED,
} from "../actions/stationsActions";

const initialState = [];

const stationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STATIONS:
      return action.stations;
    case UPDATE_STATION_SUCCEEDED:
      return state.map((s) => {
        if (s.id === action.station.id) return action.station;
        return s;
      });
    case ADD_STATION_SUCCEEDED:
      return [...state, action.station];
    case DELETE_STATION_SUCCEEDED:
      return state.filter((s) => s.id !== action.stationId);

    default:
      return state;
  }
};

export default stationsReducer;
