import { AppContext } from "contexts/useOpenEditContext";
import React, { useContext } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { deleteOneNote } from "utils/Cookies";
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
      <FaSearch className="icon_zoom" size={30} />
      <FaTrash
        className="icon_trash"
        size={30}
        onClick={() => deleteOneNote(title)}
      />
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
