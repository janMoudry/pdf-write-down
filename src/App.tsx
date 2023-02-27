import React from "react";
import "./App.css";
import Home from "pages/Home";
import { Footer, Header } from "components";
import SideMenu from "components/SideMenu";
import OpenEditContext from "contexts/useOpenEditContext";

const App: React.FC = () => (
  <div className="app">
    <OpenEditContext>
      <Header />
      <Home />
      <SideMenu />
      <Footer />
    </OpenEditContext>
  </div>
);

export default App;
