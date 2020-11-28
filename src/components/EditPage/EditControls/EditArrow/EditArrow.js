import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const redFilter =
  "invert(1) hue-rotate(90deg) brightness(1.8) drop-shadow(2px 2px 3px #8080807a)";
const greenFilter =
  "hue-rotate(170deg) brightness(1) drop-shadow(rgba(128, 128, 128, 0.48) 2px 2px 3px)";

const EditArrow = ({
  from,
  to,
  direction,
  stations,
  controlTower,
  isAddNew,
  onSubmit,
  onDelete,
}) => {
  const [newFrom, setNewFrom] = useState(from || "");
  const [newTo, setNewTo] = useState(to || "");
  const [newDir, setNewDir] = useState(direction || 0);
  const [filter, setFilter] = useState(redFilter);

  useEffect(() => {
    if (from) setNewFrom(from);
  }, [from, setNewFrom]);

  useEffect(() => {
    if (to) setNewTo(to);
  }, [to, setNewTo]);

  useEffect(() => {
    setNewDir(direction || 0);
  }, [direction, setNewDir]);

  useEffect(() => {
    if (newDir) setFilter(redFilter);
    else setFilter(greenFilter);
  }, [newDir, setFilter]);

  const onClickHandler = () => {
    if (isAddNew) onSubmit({ fromId: newFrom, toId: newTo, direction: newDir });
  };

  const onDeleteHandler = () => {
    onDelete({ fromId: from, toId: to, direction });
  };

  let content = (
    <button className="btn-delete" onClick={onDeleteHandler}>
      Delete this connection ❌
    </button>
  );
  if (isAddNew) {
    content = (
      <React.Fragment>
        <span>from </span>
        <select onChange={(e) => setNewFrom(e.target.value)} value={newFrom}>
          <option value="" disabled></option>
          {stations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
          <option value={controlTower.id}>{controlTower.name}</option>
        </select>
        <span> to </span>
        <select onChange={(e) => setNewTo(e.target.value)} value={newTo}>
          <option value="" disabled></option>
          {stations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <br />
        <span> connection type </span>
        <select onChange={(e) => setNewDir(+e.target.value)} value={newDir}>
          <option value={0}>landing</option>
          <option value={1}>takeoff</option>
        </select>
        <button onClick={onClickHandler}>Add</button>
      </React.Fragment>//TODO Add validations
    );
  }

  return (
    <div className="edit-control">
      <img
        src="https://img.icons8.com/color/48/000000/curly-arrow.png"
        alt="edit connection"
        style={{ filter }}
      />
      <div className="edit-control_title">
        {isAddNew ? "Add new connection" : "Delete this connection"}
      </div>
      <div className="edit-control_content">{content}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stations: state.stations,
  controlTower: state.controlTowers.selected,
});
export default connect(mapStateToProps)(EditArrow);
