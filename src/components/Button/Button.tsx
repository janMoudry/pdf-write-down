import React from "react";
import { FaPlus } from "react-icons/fa";
import ButtonProps from "./Button.types";
import "./styles/Button.css";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  styles,
  isDisabled,
  isSecondary,
}) => {
  return (
    <div
      onClick={onClick}
      style={styles}
      className={`button ${isDisabled && "button_disable"}${
        isSecondary && "button_secondary"
      }`}
      tabIndex={0}
    >
      {icon}
      {label}
    </div>
  );
};

export default Button;
