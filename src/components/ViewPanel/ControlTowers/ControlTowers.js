import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getControlTowers,
  selectTower,
} from "../../../redux/actions/controlTowersActions";
import "./ControlTowers.css";

const ControlTowers = ({ data, getTowers, selected, onSelect }) => {
  useEffect(() => {
    getTowers();
  }, [getTowers]);

  return (
    <select
      className="control-twoer-select"
      onChange={(e) => onSelect(e.target.value)}
      value={selected?.id}
    >
      {data.map((t) => (
        <option value={t.id} key={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
};

const mapStateToProps = (state) => ({
  data: state.controlTowers.towers,
  selected: state.controlTowers.selected,
});
const mapDispatchToProps = (dispatch) => ({
  getTowers: () => dispatch(getControlTowers()),
  onSelect: (towerId) => dispatch(selectTower(towerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlTowers);
