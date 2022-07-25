import React, { useState } from "react";
import moment from "moment";
import "../../../components/Calendar/styles.css";
import Calendar from "../../../components/Calendar/calendar";

export function ProfileAdmin() {
  const [value, setValue] = useState(moment());
  return (
    <>
      <h1>PROFILE NUTRI</h1>
      <Calendar value={value} onChange={setValue} />
    </>
  );
}
