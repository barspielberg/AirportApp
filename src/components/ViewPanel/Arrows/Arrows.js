import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRelationsForControlTower } from "../../../redux/actions/arrowsActions";
import Arrow from "./Arrow/Arrow";

const Arrows = ({ data, towerId, getArrows, stations }) => {
  useEffect(() => {
    if (towerId && stations.length > 0) getArrows(towerId);
  }, [towerId, getArrows, stations]);

  return data.map((a) => (
    <Arrow
      key={a.fromId + "_" + a.toId}
      from={a.fromId}
      to={a.toId}
      direction={a.direction}
    />
  ));
};

const mapStateToProps = (state) => ({
  data: state.arrows,
  towerId: state.controlTowers.selected.id,
  stations: state.stations,
});

const mapDispatchToProps = (dispatch) => ({
  getArrows: (towerId) => dispatch(getRelationsForControlTower(towerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Arrows);
