import {
  INIT_TOWERS,
  SELECT_TOWER,
  UPDATE_CONTROL_TOWER_SUCCEEDED,
  ADD_CONTROL_TOWER_SUCCEEDED,
} from "../actions/controlTowersActions";

const initialState = { towers: [], selected: {} };

const controlTowersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_TOWERS:
      return { towers: action.towers, selected: action.towers[0] };
    case SELECT_TOWER:
      return {
        ...state,
        selected: state.towers.find((ct) => ct.id === action.towerId),
      };
    case UPDATE_CONTROL_TOWER_SUCCEEDED:
      return {
        ...state,
        towers: state.towers.map((ct) => {
          if (ct.id === action.controlTower.id) return action.controlTower;
          else return ct;
        }),
        selected:
          state.selected.id === action.controlTower.id
            ? action.controlTower
            : state.selected,
      };
    case ADD_CONTROL_TOWER_SUCCEEDED:
      return { ...state, towers: [...state.towers, action.controlTower] };

    default:
      return state;
  }
};

export default controlTowersReducer;
