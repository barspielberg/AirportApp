import {
  SET_FUTURE_FLIGHTS,
  INIT_PLANES,
  PLANE_SENDED,
  ADD_FUTURE_FLIGHT,
} from "../actions/planesActions";

const guidEmpty = "00000000-0000-0000-0000-000000000000";

const initialState = { planes: [], futureFlights: [] };

const planeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PLANES:
      return { ...state, planes: action.planes };

    case PLANE_SENDED:
      console.log(
        "plane arrived",
        action.plane.id,
        action.plane.name,
        action.plane.stationId
      );

      if (action.plane.stationId === guidEmpty)
        return {
          ...state,
          planes: state.planes.filter((p) => p.id !== action.plane.id),
        };

      const plane = state.planes.find((p) => p.id === action.plane.id);
      if (plane)
        return {
          ...state,
          planes: state.planes.map((p) => {
            if (p.id === action.plane.id) p.stationId = action.plane.stationId;
            return p;
          }),
        };
      return {
        ...state,
        planes: [...state.planes, { ...action.plane }],
        futureFlights: state.futureFlights.filter(
          (f) => f.id !== action.plane.id
        ),
      };

    case SET_FUTURE_FLIGHTS:
      return { ...state, futureFlights: action.flights };

    case ADD_FUTURE_FLIGHT:
      return {
        ...state,
        futureFlights: [...state.futureFlights, action.flight],
      };

    default:
      return state;
  }
};

export default planeReducer;
