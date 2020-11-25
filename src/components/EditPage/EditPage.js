import React from "react";
import EditControls from "./EditControls/EditControls";
import EditView from "./EditView/EditView";
import "./EditPage.css";

const EditPage = () => {

  return (
    <div className='edit-page'>
      <EditView />
      <EditControls />
      
    </div>
  );
};

export default EditPage;
