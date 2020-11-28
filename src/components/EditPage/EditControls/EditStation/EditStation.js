import React, { useEffect, useState } from "react";

const EditStation = ({ id, name, isAddNew ,onSubmit, onDelete}) => {
  const [newName, setNewName] = useState(name || "");
  useEffect(() => {
    if (name) setNewName(name);
  }, [name, setNewName]);

  const onClickHandler = () => {
    onSubmit({ name: newName, id });
    if (isAddNew) setNewName("");
  };
  //TODO Add validations
  return (
    <div className="edit-control">
      <img
        src="https://img.icons8.com/cotton/64/000000/gas-station.png"
        alt="edit station"
      />
      <div className="edit-control_title">
        {isAddNew ? "Add new station to this airport" : "Edit this station"}
      </div>
      <div className="edit-control_content">
        <input
          type="text"
          placeholder="station mame"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={onClickHandler}>{isAddNew ? "Add" : "Change"}</button> 
        {!isAddNew && (
          <button className="btn-delete" onClick={() => onDelete(id)} >Delete this station ❌</button> //TODO Add "are you sure?"
        )}
      </div>
    </div>
  );
};

export default EditStation;
