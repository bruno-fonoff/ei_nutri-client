import React, { useState } from "react";
import moment from "moment";
import "../styles.css";
import Calendar from "../calendar";

export function Teste() {
  const [form, setForm] = useState([]);

  function handleChange(e) {
    setForm(e.target.value);
  }

  const [value, setValue] = useState(moment());

  return (
    <>
      <h1>PROFILE NUTRI</h1>
      <Calendar
        value={value}
        onChange={setValue}
        form={form}
        setForm={setForm}
      />

      <select onChange={handleChange}>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
    </>
  );
}
