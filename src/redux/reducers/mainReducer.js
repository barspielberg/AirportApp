import { combineReducers } from "redux";
import arrowsReducer from "./arrowsReducer";
import controlTowersReducer from "./controlTowersReducer";
import planeReducer from "./planesReducer";
import stationsReducer from "./stationsReducer";
import connectionReducer from "./connectionReducer";

export default combineReducers({
  stations: stationsReducer,
  arrows: arrowsReducer,
  planes: planeReducer,
  controlTowers: controlTowersReducer,
  connection: connectionReducer,
});
