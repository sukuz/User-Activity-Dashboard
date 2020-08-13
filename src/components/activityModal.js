import React, { useState, useEffect } from "react";
import Calendar from "rc-calendar";
import DatePicker from "rc-calendar/lib/Picker";
import "rc-calendar/assets/index.css";
import moment from "moment";

export default function AcitivityModal(props) {
  const _date = new Date().toLocaleDateString();
  const [date, setDate] = useState(_date);
  const [filteredActivityPeriods, setFilteredPeriods] = useState([]);
  const calendar = <Calendar />;
  const activePeriods = props.activityPeriod;

  useEffect(() => {
    const results =
      activePeriods &&
      activePeriods.length &&
      activePeriods.filter(
        (each) =>
          new Date(each.start_time.slice(0, 11).trim()).toLocaleDateString() ===
          date
      );
    console.log("filtered", results);
    setFilteredPeriods(results);
  }, [date]);

  function splitDate(time) {
    return time.split(" ").slice(3);
  }

  return (
    <>
      <div className="activityModal">
        <h3>{`Active Periods of user : ${props.name}`}</h3>
        <div className="calender">
          <DatePicker
            animation="slide-up"
            value={moment(date, "DD/MM/YYYY")}
            disabled={false}
            calendar={calendar}
            onChange={(newDate) => {
              const formattedDate = new Date(newDate).toLocaleDateString();
              return setDate(formattedDate);
            }}
          >
            {({ value }) => {
              return (
                <div className="calendar">
                  <label>Select Date: </label>
                  <input
                    value={value ? new Date(value).toLocaleDateString() : ""}
                  />
                </div>
              );
            }}
          </DatePicker>
        </div>
        {filteredActivityPeriods.length ? (
          <table className="tableclass">
            <thead>
              <tr>
                <th>Periods of activity</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivityPeriods.map((each) => {
                return (
                  <tr>
                    <td>{each.start_time.split("", 11)}</td>
                    <td>{splitDate(each.start_time)}</td>
                    <td>{splitDate(each.end_time)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div id="no-items">No active periods found</div>
        )}
        <button className="closebtn" onClick={() => props.setShowModal(false)}>
          X
        </button>
      </div>
    </>
  );
}
