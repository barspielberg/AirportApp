import Axios from "axios";
import { setError } from "./connectionActions";

export const INIT_PLANES = "INIT_PLANES";
export const PLANE_SENDED = "PLANE_SENDED";
export const SET_FUTURE_FLIGHTS = "SET_FUTURE_FLIGHTS";
export const ADD_FUTURE_FLIGHT = "ADD_FUTURE_FLIGHT";

export const getActiveFlightsForControlTower = (towerId) => (dispatch) => {
  Axios.get("ActiveFlightsForControlTower/" + towerId)
    .then((res) => dispatch(initPlanes(res.data)))
    .catch(err=>dispatch(setError(err.message)));
};

export const getUnfulfilledFlightsForControlTower = (towerId) => (dispatch) => {
  Axios.get("UnfulfilledFlightsForControlTower/" + towerId)
    .then((res) => {
      const mapedFlights = res.data.map((f) => {
        f.date = new Date(f.date);
        return f;
      });
      dispatch(setFutureFlights(mapedFlights));
    })
    .catch(err=>dispatch(setError(err.message)));
};

export const initPlanes = (planes) => ({
  type: INIT_PLANES,
  planes,
});

export const planeSended = (plane) => ({
  type: PLANE_SENDED,
  plane,
});

export const setFutureFlights = (flights) => ({
  type: SET_FUTURE_FLIGHTS,
  flights,
});

export const addFutureFlight = (flight) => ({
  type: ADD_FUTURE_FLIGHT,
  flight: { ...flight, date: new Date(flight.date) },
});
