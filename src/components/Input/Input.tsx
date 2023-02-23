import React from "react";
import InputProps from "./Input.types";
import "./styles/Input.css";

const Input: React.FC<InputProps> = ({
  onChange,
  label,
  inputRef,
  styles,
  placeholder,
}) => {
  return (
    <div className="input_container" style={styles}>
      <label> {label}: </label>
      <input
        ref={inputRef}
        onChange={onChange}
        placeholder={`${placeholder}...`}
        type="text"
      />
    </div>
  );
};

export default Input;
