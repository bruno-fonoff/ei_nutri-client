import React, { useState, useEffect } from "react";
// import moment from "moment";
import "./styles.css";
import buildCalendar from "./buildCalendar";
import dayStyles, { beforeToday, isSunSat } from "./styles.js";
import CalendarHeader from "./header";
import "moment/locale/pt-br";
import setHours from "date-fns/setHours";

export default function Calendar({ value, onChange, setDateHour }) {
  const [calendar, setCalendar] = useState([]);
  const [hour, setHour] = useState("");
  const [daySelected, setDaySelected] = useState([]);

  function handleAddDay(day) {
    setDaySelected(day.format("L"));
    // console.log("setando a data");
  }

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function setupDate() {
    const dateString = daySelected.split("/");
    const selectedHour = setHours(
      new Date(dateString[2], dateString[1] - 1, dateString[0]),
      hour
    );
    // console.log("juntando os dois");
    return selectedHour;
  }

  return (
    <div className='flex justify-center'>
      <div className="calendar pt-4">
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
        <div className="pt-2 flex justify-center">
          <label className="text-sm font-bold mb-2 pt-2">Escolha um horário:</label>
          <select
            className="bg-gray-200 border ml-2 pl-6 border-gray-200 text-gray-700 px-4 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="hour-input"
            name="hour"
            onChange={(e) => {
              setHour(e.target.value);
              // console.log("setando a hora");
            }}
            defaultValue="08"
          >
            <option value="08">08:00</option>
            <option value="09">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
          </select>
          <button
            className="bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold ml-2 px-4 rounded-full"
            onClick={() => {
              setDateHour(setupDate());
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
