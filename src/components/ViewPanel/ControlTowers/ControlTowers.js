import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getControlTowers } from "../../../redux/actions/controlTowersActions";
import "./ControlTowers.css";

const ControlTowers = ({ data, getTowers }) => {
  useEffect(() => {
    getTowers();
  }, [getTowers]);

  return (
    <select className="control-twoer-select" onChange={console.log}>
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
});
const mapDispatchToProps = (dispatch) => ({
  getTowers: () => dispatch(getControlTowers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlTowers);
