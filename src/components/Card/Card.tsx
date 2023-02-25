import React from "react";
import { FaSearch } from "react-icons/fa";
import "./styles/Card.css";

const Card: React.FC = () => {
  return (
    <div className="card_container">
      <h1>{"title".toUpperCase()}</h1>
      <FaSearch className="icon" size={30} />

      <p>
        Pokud by se pro stejný účel použil smysluplný text, bylo by těžké
        hodnotit pouze vzhled, aniž by se pozorovatel nechal svést ke čtení
        obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text (např.
        opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo
        vyrušováno pravidelnou strukturou textu, která se od běžného textu liší.
        Text lorem ipsum na první pohled připomíná běžný text, slova jsou různě
        dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá
        přirozeně atd.
      </p>
    </div>
  );
};

export default Card;
