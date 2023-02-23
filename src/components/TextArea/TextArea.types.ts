import { CSSProperties } from "react";

interface TextAreaProps {
  label: string;
  onChange: () => void;
  textAreaRef: React.Ref<HTMLTextAreaElement>;
  placeholder?: string;
  styles?: CSSProperties;
}

export default TextAreaProps;
