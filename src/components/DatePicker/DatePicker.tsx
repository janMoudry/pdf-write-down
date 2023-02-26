import React from "react";
import DatePickerProps from "./DatePicker.types";
import "./styles/DatePicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ datePickerRef, label }) => (
  <div className="date_picker_container">
    <label> {label} </label>
    <input className="date_picker" type={"date"} />
  </div>
);

export default DatePicker;
