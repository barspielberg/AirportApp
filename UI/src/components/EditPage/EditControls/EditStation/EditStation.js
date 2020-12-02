import React, { useEffect, useState } from "react";

const EditStation = ({ id, name, isAddNew, onSubmit, onDelete, onError }) => {
  const [newName, setNewName] = useState(name || "");
  useEffect(() => {
    if (name) setNewName(name);
  }, [name, setNewName]);

  const onClickHandler = () => {
    if (newName === "") onError("the name of a station can't be empty");
    else onSubmit({ name: newName, id });
    if (isAddNew) setNewName("");
  };

 
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
          <button className="btn-delete" onClick={() => onDelete(id)}>
            Delete this station ❌
          </button>
        )}
      </div>
    </div>
  );
};

export default EditStation;
