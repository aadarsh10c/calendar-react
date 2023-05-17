import React , { useState } from "react"
import { format, 
        endOfMonth,
        startOfMonth,
        endOfWeek,
        startOfWeek,
        addDays,
        isSameMonth,
        isSameDay,
        compareAsc,
        subMonths,
        addMonths
     } from 'date-fns'

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import timeSheetJSON from './assets/timeSheet.json'
import  holidayJSON from './assets/holiday'


export default function Calendar(){
    const [ selectedDate , setSelectedDate] = useState( new Date ())
    const [ activeDate , setActiveDate] = useState( new Date ())

    //Convert the JSON data into a map with key as date
    const parseResponseToMap = ( obj ) => {
        const dataArray = [ ...obj.body ]
        const dataMap = new Map() 
        dataArray.forEach( obj => {
            dataMap.set( obj.date , obj )  
        })
        return dataMap
    }


    //fetch json data
    const holidayMap = parseResponseToMap( holidayJSON ) 
    // const timeSheetMap = parseResponseToMap( timeSheetJSON )

    //function to check whether the date is present in a given map or not
    const hasDate = ( dateString, mapObj ) => mapObj.has( dateString ) 



    
    const getDatesForCurrentWeek = ( date , selectedDate , activeDate ) => {
        let currentDate = date
        const week = []
        for( let day = 0; day < 7; day++ ){

            let formatedDate = format( currentDate , 'yyyy-MM-dd')
            const isHoliday = hasDate( formatedDate, holidayMap )

            const cellStyle = `date flex flex-column ${isHoliday ?'justify-between':''} ${isHoliday ? 'align-center': 'justify-start'} ${  
                isSameMonth( currentDate , activeDate ) ? '' : 'inactiveDay' } ${
                    isSameDay( currentDate , new Date()) ? 'bg-tr-pink' : ''} ${
                        compareAsc( currentDate , new Date()) > 0 ? 'inactiveDay' : ''}`
            
            week.push(
                <div key={formatedDate} className={cellStyle}>
                    {format( currentDate, 'd')}
                    { holidayMap.has(formatedDate) ? <p className="holiday">{holidayMap.get(formatedDate).reason}</p> : ''}
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
        console.log( allWeeks )
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