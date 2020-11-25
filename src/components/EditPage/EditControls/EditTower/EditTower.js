import React from "react";

const EditTower = ({ isAddNew }) => {
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
        <input type="text" placeholder="control tower mame" />
        <button>{isAddNew ? "Add" : "Change"}</button>
        {!isAddNew && (
          <button className="btn-delete">Delete this airport ❌</button>
        )}
      </div>
    </div>
  );
};

export default EditTower;
