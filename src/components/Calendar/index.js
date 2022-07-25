import React, { useState } from "react";
import moment from "moment";
import "./styles.css";
import Calendar from "./calendar";

export default function App() {
  const [value, setValue] = useState(moment());
  return (
    <div>
      <Calendar value={value} onChange={setValue} />
    </div>
  );
}
