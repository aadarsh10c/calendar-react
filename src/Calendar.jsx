import React , { useState } from "react"
import { format, 
        endOfMonth,
        startOfMonth,
        endOfWeek,
        startOfWeek,
        addDays,
        isSameMonth,
        isSameDay,
        compareAsc
     } from 'date-fns'

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


export default function Calendar(){
    const [ selectedDate , setSelectedDate] = useState( new Date ())
    const [ activeDate , setActiveDate] = useState( new Date ())

    const getDatesForCurrentWeek = ( date , selectedDate , activeDate ) => {
        let currentDate = date
        const week = []
        for( let day = 0; day < 7; day++ ){
            week.push(
                <div className={`date ${  
                isSameMonth( currentDate , activeDate ) ? '' : 'inactiveDay' } ${
                    isSameDay( currentDate , new Date()) ? 'bg-tr-pink' : ''} ${
                        compareAsc( currentDate , new Date()) > 0 ? 'inactiveDay' : ''
                    }
            `}>
                    {format( currentDate, 'd')}
                </div>
            )
            currentDate = addDays( currentDate, 1)
        }
        return <>{week}</>
    }

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth( activeDate )
        const endOfTheSelectedMonth = endOfMonth( activeDate )
        const startDate = startOfWeek( startOfTheSelectedMonth )
        const endDate = endOfWeek(endOfTheSelectedMonth )
        
        let currentDate = startDate

        const allWeeks = []

        while( currentDate <= endDate ){
            allWeeks.push(
                getDatesForCurrentWeek( currentDate , selectedDate , activeDate )
            )
            currentDate = addDays( currentDate , 7)
        }
        return allWeeks

    }

    const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const daysInWeek = [ ...WEEKDAYS].map( day => {
        return(
        <div className="dayRow">
            {day}
        </div>
    )}) 
    return(
        <div className="calendar">
          <div className="calendar-nav flex align-center justify-between">
            <AiOutlineLeft
                className="navIcon"
                onClick={() => setActiveDate(subMonths(activeDate, 1))}
            />
              <h1>{format( activeDate , "MMM yyyy")}</h1>
              <AiOutlineRight
                className="navIcon"
                onClick={() => setActiveDate(addMonths(activeDate, 1))}
                />
          </div>
          <div className="calendar-table">
                {daysInWeek}
                {getDates()}
          </div>
        </div>
    )
}