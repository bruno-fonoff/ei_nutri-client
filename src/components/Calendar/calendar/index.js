import React, { useState, useEffect } from "react";
import moment from "moment";
import "./styles.css";
import buildCalendar from "./buildCalendar";
import dayStyles, { beforeToday, isSunSat } from "./styles.js";
import CalendarHeader from "./header";
import "moment/locale/pt-br";

import setDate from "date-fns/setDate";
import setHours from "date-fns/setHours";

export default function Calendar({ value, onChange, form, setForm }) {
  const [calendar, setCalendar] = useState([]);
  const [daySelected, setDaySelected] = useState([]);

  console.log(form);
  const resultDate = setDate(new Date(2014, 8, 1), 30);
  // console.log(resultDate)
  const resultHour = setHours(new Date(2014, 8, 1, 11, 30), form);
  console.log(resultHour);

  function handleAddDay(day) {
    setDaySelected(day.format("LLL"));
    const dayNumbers = day.toArray();
    console.log(dayNumbers);
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
              {/* {console.log(week[0])} */}
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
