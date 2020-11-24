import Axios from "axios";

export const INIT_STATIONS = "INIT-STATIONS";

export const getStationsForControlTower = (towerId) => (dispatch) => {
  Axios.get("StationsForControlTower/" + towerId)
    .then((res) => dispatch(initStations(res.data)))
    .catch(console.log);
};

export const initStations = (stations) => ({
  type: INIT_STATIONS,
  stations,
});
