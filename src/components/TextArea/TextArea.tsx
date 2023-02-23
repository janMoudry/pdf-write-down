import React from "react";
import "./styles/TextArea.css";
import TextAreaProps from "./TextArea.types";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  textAreaRef,
  onChange,
  placeholder,
  styles,
}) => {
  return (
    <div className="textarea_container" style={styles}>
      <label> {label}: </label>
      <textarea
        placeholder={`${placeholder}...`}
        ref={textAreaRef}
        onChange={onChange}
        rows={20}
      />
    </div>
  );
};

export default TextArea;
