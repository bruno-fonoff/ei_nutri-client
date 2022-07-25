import React, { useState, useEffect } from "react";
import moment from "moment";
import "./styles.css";
import buildCalendar from "./buildCalendar";
import dayStyles, { beforeToday, isSunSat } from "./styles.js";
import CalendarHeader from "./header";
import "moment/locale/pt-br";

export default function Calendar({ value, onChange }) {
  const [calendar, setCalendar] = useState([]);
  const [daySelected, setDaySelected] = useState([]);

  function handleAddDay(day) {
    setDaySelected(day.format("LLL"));
    console.log(day);
  }
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <>
      <h1>{daySelected.toString().slice(0, 20)}</h1>
      <div className="calendar">
        <CalendarHeader value={value} setValue={onChange} />
        <div className="body">
          <div className="day-names">
            {["d", "s", "t", "q", "q", "s", "s"].map((d, index) => (
              <div className="week" key={index}>
                {d}
              </div>
            ))}
          </div>
          {calendar.map((week) => (
            <div key={week}>
              {console.log(week[0])}
              {week.map((day, index) => (
                <div
                  key={index}
                  className="day"
                  onClick={() => {
                    isSunSat(day);
                    handleAddDay(day);
                    !beforeToday(day) && onChange(day);
                  }}
                >
                  <div className={dayStyles(day, value)}>
                    {day.format("D").toString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
