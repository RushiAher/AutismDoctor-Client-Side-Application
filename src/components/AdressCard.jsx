import React from "react";

const AdressCard = (props) => {
  return (
    <>
      <div className="card-container">
        <div className="icon">{props.icon}</div>
        <div className="card-info">
          <h1>{props.name}</h1>
          <p>{props.value}</p>
        </div>
      </div>
    </>
  );
};

export default AdressCard;
