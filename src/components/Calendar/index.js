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
  const [hour, setHour] = useState({ hour: "" });
  const [daySelected, setDaySelected] = useState([]);
  // const hour = "10";

  function handleHour(e) {
    setHour(e.target.value);
  }

  console.log(form);
  const resultDate = setDate(new Date(2014, 8, 1), 30);
  // console.log(resultDate)
  const resultHour = setHours(new Date(2014, 8, 1, 11, 30), form);
  console.log(resultHour);

  function handleAddDay(day) {
    setDaySelected(day.format("LL"));
    console.log(day.hour(hour));
  }
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <>
      <h1>{daySelected.toString()}</h1>
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
        <div>
          <label>Escolha um Horário</label>
          <select id="hour-input" name="hour" onChange={handleHour}>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
          </select>
        </div>
      </div>
    </>
  );
}
