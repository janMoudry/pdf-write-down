import React from "react";
import { FaSearch } from "react-icons/fa";
import CardProps from "./Card.types";
import InfoBlock from "./components/InfoBlock";
import "./styles/Card.css";

const Card: React.FC<CardProps> = ({
  title,
  blocks: { priority, category, date },
  description,
}) => {
  return (
    <div className="card_container">
      <h1>{title.toUpperCase()}</h1>
      <FaSearch className="icon" size={30} />
      <div className="info_blocks_container">
        <InfoBlock text={priority} />
        <InfoBlock text={category} />
      </div>
      <InfoBlock text={date} />

      <p>{description}</p>
    </div>
  );
};

export default Card;
