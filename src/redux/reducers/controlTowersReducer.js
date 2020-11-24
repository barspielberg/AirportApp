import { INIT_TOWERS, SELECT_TOWER } from "../actions/controlTowersActions";

const initialState = { towers: [], selected: {} };

const controlTowersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_TOWERS:
      return { towers: action.towers, selected: action.towers[0] };
    case SELECT_TOWER:
      return { ...state, seledted: action.tower };

    default:
      return state;
  }
};

export default controlTowersReducer;
