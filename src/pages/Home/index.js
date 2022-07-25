import React, { useState } from "react";
import moment from "moment";
import "../../components/Calendar/styles.css";
import Calendar from "../../components/Calendar/index.js";

export function Home() {
  const [value, setValue] = useState(moment());
  return (
    <>
      <h1>HOME</h1>
      <Calendar value={value} onChange={setValue} />
    </>
  );
}
