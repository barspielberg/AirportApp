export const SELECT_STATION = "SELECT_STATION";
export const SELECT_CONNECTION = "SELECT_CONNECTION";
export const CLEAR_SELECTED_STATION = "CLEAR_SELECTED_STATION";

export const selectConnection = (connection) => ({
  type: SELECT_CONNECTION,
  connection,
});

export const selectStation = (station) => ({
  type: SELECT_STATION,
  station,
});
export const clearSlelectedStation = () => ({
  type: CLEAR_SELECTED_STATION,
});
