import { Button, Input, Seznam, TextArea } from "components";
import { SeznamData } from "components/Seznam/Seznam.types";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./styles/Form.css";

const Form: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [selectedCategoryID, setSelectedCategoryID] = useState(0);
  const [selectedCPriorityID, setSelectedPriorityID] = useState(0);
  const titleInputRef = useRef<null | HTMLInputElement>(null);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  const setCheckBox = (id: number, name: "Category" | "Priority") => {
    switch (name) {
      case "Category":
        setSelectedCategoryID(id);
        break;
      case "Priority":
        setSelectedPriorityID(id);
        break;
    }
  };

  return (
    <div className={`form ${isOpen ? "form_visible" : "form_unvisible"}`}>
      <h1 className="main_title">Create note</h1>
      <Input
        onChange={() => {}}
        label="Title"
        placeholder="dinner"
        inputRef={titleInputRef}
      />
      <div className="seznams_container">
        <Seznam
          title="Priority"
          data={priorityData}
          onSelect={setCheckBox}
          selected={selectedCPriorityID}
        />
        <Seznam
          title="Category"
          data={categoryData}
          onSelect={setCheckBox}
          selected={selectedCategoryID}
        />
      </div>
      <TextArea
        label="text"
        textAreaRef={textAreaRef}
        onChange={() => {}}
        placeholder={"Buy flowers for dinner"}
      />
      <Button
        label="Save"
        onClick={() => {
          console.log(titleInputRef.current && titleInputRef.current.value);
        }}
        icon={<FaPlus className="button_icon" />}
      />
    </div>
  );
};

export default Form;

const priorityData: SeznamData = [
  {
    text: "Major",
    id: 0,
  },
  {
    text: "Regular",
    id: 1,
  },
  {
    text: "Minor",
    id: 2,
  },
];
const categoryData: SeznamData = [
  {
    text: "Note",
    id: 0,
  },
  {
    text: "Meeting",
    id: 1,
  },
  {
    text: "Task",
    id: 2,
  },
  {
    text: "Event",
    id: 3,
  },
];
