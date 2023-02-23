import React from "react";
import "./styles/SideMenu.css";
import { FaArrowRight } from "react-icons/fa";
import Form from "./components/Form";

const SideMenu: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <div
      className={`side_menu ${isOpen ? "side_menu_open" : "side_menu_closed"}`}
    >
      <Form isOpen={isOpen} />
      <div className="icon">
        <FaArrowRight size={50} onClick={() => setOpen(!isOpen)} />
      </div>
    </div>
  );
};

export default SideMenu;
