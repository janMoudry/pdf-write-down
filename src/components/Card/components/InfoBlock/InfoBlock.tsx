import React from "react";
import "./styles/InfoBlock.css";

const InfoBlock: React.FC<{ text: string }> = ({ text }) => (
  <div className="info_block_container">
    <p> {text} </p>
  </div>
);

export default InfoBlock;
