import Axios from "axios";
import { clearSlelectedStation } from "./editActions";

export const INIT_STATIONS = "INIT-STATIONS";
export const UPDATE_STATION_SUCCEEDED = "UPDATE_STATION_SUCCEEDED";
export const ADD_STATION_SUCCEEDED = "ADD_STATION_SUCCEEDED";
export const DELETE_STATION_SUCCEEDED = "DELETE_STATION_SUCCEEDED";

export const getStationsForControlTower = (towerId) => (dispatch) => {
  Axios.get("StationsForControlTower/" + towerId)
    .then((res) => dispatch(initStations(res.data)))
    .catch(console.log);
};

export const UpdateStation = (station) => (dispatch) => {
  Axios.put("Station/" + station.id, station)
    .then((res) => dispatch(updateStationSucceeded(res.data)))
    .catch(console.log);
};

export const AddNewStation = (station) => (dispatch) => {
  Axios.post("Station/", station)
    .then((res) => dispatch(addNewStationSucceeded(res.data)))
    .catch(console.log);
};
export const DeleteStation = (stationId) => (dispatch) => {
  Axios.delete("station/" + stationId)
    .then((res) => {
      dispatch(deleteStationSucceeded(res.data));
      dispatch(clearSlelectedStation());
    })
    .catch(console.log);
};

const initStations = (stations) => ({
  type: INIT_STATIONS,
  stations,
});

const updateStationSucceeded = (station) => ({
  type: UPDATE_STATION_SUCCEEDED,
  station,
});

const addNewStationSucceeded = (station) => ({
  type: ADD_STATION_SUCCEEDED,
  station,
});
const deleteStationSucceeded = (station) => ({
  type: DELETE_STATION_SUCCEEDED,
  stationId: station.id,
});
