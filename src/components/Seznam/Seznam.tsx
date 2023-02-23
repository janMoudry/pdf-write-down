import React from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import SeznamProps from "./Seznam.types";
import "./styles/Seznam.css";

const Seznam: React.FC<SeznamProps> = ({ data, title, onSelect, selected }) => {
  return (
    <div className="seznam">
      <h1> {title}: </h1>
      <div className="items_container">
        {data.map(({ text, id }) => (
          <div
            key={id}
            className={`item_container ${selected === id && "item_selected"} `}
            onClick={() => {
              onSelect(id, title);
            }}
            tabIndex={0}
          >
            {selected === id ? (
              <FaCheck />
            ) : (
              <FaPlus className="seznam_plus_icon" />
            )}
            <p> {text} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seznam;
