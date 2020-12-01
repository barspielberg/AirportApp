import { HubConnectionBuilder } from "@microsoft/signalr";

export const SET_CONNECTION = "SET_CONNECTION";
export const SET_CONNECTED = "SET_CONNECTED";
export const SET_ERROR = "SET_ERROR";
export const DISMISS_ERROR = "DISMISS_ERROR";

export const connectToSIngnalR = () => (dispatch) => {
  const newConncetion = new HubConnectionBuilder()
    .withUrl("http://localhost:52961/FlightsHub")
    .build();
  dispatch(setConnection(newConncetion));
  startConnection(newConncetion, dispatch);
};

export const setConnection = (connection) => ({
  type: SET_CONNECTION,
  connection,
});


export const setError = (error) => ({
  type: SET_ERROR,
  error,
});
export const dismissError = () => ({
  type: DISMISS_ERROR,
});

const startConnection = (connection, dispatch) => {
  connection
    .start()
    .then(() => {
      if (connection.state === "Connected") {
        dispatch(setConnected(true));
      }
    })
    .catch((e) => {
      dispatch(setConnected(false));
    });
};
const setConnected = (connected) => ({
  type: SET_CONNECTED,
  connected,
});

