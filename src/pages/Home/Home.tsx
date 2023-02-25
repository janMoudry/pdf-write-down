import { Card } from "components";
import React from "react";
import "./styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1 className="main_title"> Take a note!!! </h1>
      <div className="cards_container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
