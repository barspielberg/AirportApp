import React from "react";
import "./AreYouSure.css";

const AreYouSure = ({ type, deleteFunc, close }) => {
  const onDeleteHandelr = () => {
    deleteFunc();
    close();
  };

  return (
    <div className="verification-window">
      <div className="wonder">⚠ Wow! ⚠</div>
      <div className="question">
        Are you sure you want to delete this {type}?
      </div>
      {type === "airport" && (
        <div className="disc">
          All his stations and arrows will also be deleted
        </div>
      )}
      {type === "station" && (
        <div className="disc">All his arrows will also be deleted</div>
      )}
      <div className="btns">
        <button onClick={onDeleteHandelr}>yes</button>
        <button onClick={close}>no</button>
      </div>
    </div>
  );
};

export default AreYouSure;
