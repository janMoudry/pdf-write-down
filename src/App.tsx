import React from "react";
import "./App.css";
import Home from "pages/Home";
import { Footer, Header } from "components";
import SideMenu from "components/SideMenu";

const App: React.FC = () => (
  <div className="app">
    <Header />
    <Home />
    <SideMenu />
    <Footer />
  </div>
);

export default App;
