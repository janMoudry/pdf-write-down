import React, { SetStateAction, useContext } from "react";
import "./styles/SideMenu.css";
import { FaArrowRight } from "react-icons/fa";
import Form from "./components/Form";
import { AppContext } from "contexts/useOpenEditContext";

const SideMenu: React.FC = () => {
  const { isOpen, setOpen } = useContext(AppContext);

  return (
    <div
      className={`side_menu ${isOpen ? "side_menu_open" : "side_menu_closed"}`}
    >
      <Form
        isOpen={isOpen}
        close={() => {
          setOpen && setOpen(false);
        }}
      />
      <div className="icon">
        <FaArrowRight size={50} onClick={() => setOpen && setOpen(!isOpen)} />
      </div>
    </div>
  );
};

export default SideMenu;
