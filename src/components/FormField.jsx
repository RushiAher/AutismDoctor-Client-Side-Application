import React from "react";
import "./css/style.css";
import "./css/style.min.css";

const FormField = (props) => {
  return (
    <>
      <div className="input-component">
        <span className="inp-icon">{props.icon}</span>
        <input
          type={props.type}
          className="inp-input"
          placeholder={props.placeholder}
          onChange={props.onInput}
                  name={props.name}
                  required
          autoComplete="off"
          value={props.value}
        />
      </div>
    </>
  );
};

export default FormField;
