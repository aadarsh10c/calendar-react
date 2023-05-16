import React from "react";

export default function Description(){
    return(
        <div className="description">
            <div className="summary">
                <h3 className="title text-uppercase text-pink">
                    time-off summary
                </h3>
                <p className="desc">Hours Logged: TBD</p>
                <p className="desc">Time-Off hrs/May: TBD</p>
                <p className="desc">Time-Off hrs/2023: TBD</p>
            </div>
            <div>
                <p className="legend flex align-center"><span className="label bg-green"></span> <span>Holiday</span> </p>
                <p className="legend flex align-center"><span className="label bg-pink"></span> Working</p>
                <p className="legend flex align-center"><span className="label bg-purple"></span> Time-Off</p>
                <p className="legend flex align-center"><span className="label bg-orange"></span> Commented</p>
            </div>

        </div>
    )
}