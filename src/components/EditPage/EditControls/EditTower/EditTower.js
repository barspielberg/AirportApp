import React, { useEffect, useState } from "react";

const EditTower = ({ name, id, isAddNew, onSubmit, onDelete }) => {
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
        src="https://img.icons8.com/cotton/64/000000/airport-building--v1.png"
        alt="edit control tower"
      />
      <div className="edit-control_title">
        {isAddNew ? "Add new airport" : "Edit this control tower"}
      </div>
      <div className="edit-control_content">
        <input
          type="text"
          placeholder="control tower mame"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={onClickHandler}>
          {isAddNew ? "Add" : "Change"}
        </button>
        {!isAddNew && (
          <button className="btn-delete" onClick={() => onDelete(id)}>
            Delete this airport ❌
          </button>//TODO Add "Are you sure?"
        )}
      </div>
    </div>
  );
};

export default EditTower;
