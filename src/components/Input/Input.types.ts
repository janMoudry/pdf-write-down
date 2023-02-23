import React, { CSSProperties } from "react";

interface InputProps {
  onChange: () => void;
  label: string;
  inputRef: React.Ref<HTMLInputElement>;
  styles?: CSSProperties;
  placeholder?: string;
}

export default InputProps;
