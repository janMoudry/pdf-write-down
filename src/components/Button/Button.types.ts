import React, { CSSProperties } from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactElement;
  styles?: CSSProperties;
  isDisabled?: boolean;
  isSecondary?: boolean;
}

export default ButtonProps;
