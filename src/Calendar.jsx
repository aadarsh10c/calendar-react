import React from "react";

export default function Calendar(){
    return(
        <div className="calendar">
          <div className="calendar-nav flex align-center justify-between">
          <button className="btn">&lt;</button>
            <h1 >May - 2023</h1>
            <button className="btn">&gt;</button>
          </div>
          <div className="calendar-table">
            Calendar Table
          </div>
        </div>
    )
}