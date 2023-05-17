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

//import utility function
import { parseResponseToMap } from './util'

//import componenets
import Popup from "./Popup";


export default function Calendar(){
    const [ showPopUp , setShowPopUp ] = React.useState( false )
    const [ activeDate , setActiveDate] = useState( new Date ())
    const [ colour , setColour ] = useState( '')
    const [ message , setMessage ] = useState( '')

    const _HOLIDAY = 'holiday'
    const _INVALID = 'invalid'

    

    React.useEffect(() => {
        const timer = setTimeout(() => {
        setShowPopUp(false);
      }, 2000);
     return () => clearTimeout(timer);
     }, [showPopUp]);

     

    //  console.log( showPopUp )

    //Convert the JSON data into a map with key as date
    const holidayMap = parseResponseToMap( holidayJSON ) 
    const timeSheetMap = parseResponseToMap( timeSheetJSON )

    const handleClick = ( dateString, isDayGreaterthanToday  ) => {
        if (holidayMap.has(dateString)) { 
            // console.log( 'is holiday')
            setColour(_HOLIDAY)
            setMessage( holidayMap.get( dateString ).reason )
            
            setShowPopUp( true )
        }
        else if ( isDayGreaterthanToday > 0 ){
            // console.log( 'is not today')
            setColour(_INVALID)
            setMessage( 'InActive Date')
            setShowPopUp( true )
        } 
    }


    //function to check whether the date is present in a given map or not
    const hasDate = ( dateString, map1, map2 ) =>  map1.has( dateString ) || map2.has( dateString ) 

    //function to get the widget
    const getWidget = ( formatedDate, holidayMap ,timeSheetMap ) => {
        let styleOfWidget = ''
        let value = ''
        if( holidayMap.has(formatedDate) ){
            styleOfWidget = 'holiday'
            value = holidayMap.get(formatedDate).reason
        }else{
            if(timeSheetMap.has(formatedDate) ){
                const timeSheet = timeSheetMap.get(formatedDate)
                const leave = timeSheet.leave
                const workingHours = timeSheet.workingHours
                const hasComments = timeSheet.comments.length
                if( leave ) styleOfWidget = 'leave'
                if( hasComments > 0){
                    styleOfWidget = 'commented'
                    value = `${workingHours} HRS`
                }else{
                    styleOfWidget = 'working'
                    value = `${workingHours} HRS`
                }
            }
        }

        return<><p className={styleOfWidget}>{value}</p></>
    }

    
    const getDatesForCurrentWeek = ( date  , activeDate ) => {
        let currentDate = date
        const week = []
        for( let day = 0; day < 7; day++ ){

            let formatedDate = format( currentDate , 'yyyy-MM-dd')

            //check whether the date is eventful 
            const isEvent = hasDate( formatedDate, holidayMap , timeSheetMap )

            const isDayinSameMonth = isSameMonth( currentDate , activeDate )
            const isDayGreaterthanToday = compareAsc( currentDate , new Date())

            //check for inactive dates used for rendering popups of inActive dates
            const isDayInactive = ( !isDayinSameMonth  || isDayGreaterthanToday )

            const cellStyle = `date flex flex-column ${isEvent ?'justify-between':''} ${isEvent ? 'align-center': 'justify-start'} ${  
                isDayinSameMonth ? '' : 'inactiveDay' } ${
                    isSameDay( currentDate , new Date()) ? 'bg-tr-pink' : ''} ${
                        isDayGreaterthanToday > 0 ? 'inactiveDay' : ''}`
            // console.log( `${showPopUp} ${holidayMap.has(formatedDate)}`)
            week.push(
                <div key={formatedDate} className={cellStyle} onClick={() => handleClick(formatedDate , isDayGreaterthanToday)}>
                    {format( currentDate, 'd')}
                    { isEvent && getWidget( formatedDate, holidayMap ,timeSheetMap )}
                    {/* { showPopUp && isDayInactive && <Popup/>} */}
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
                getDatesForCurrentWeek( currentDate  , activeDate )
            )
            currentDate = addDays( currentDate , 7)
        }
        // console.log( allWeeks )
        return allWeeks

    }

    const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const daysInWeek = [ ...WEEKDAYS].map( day => {
        return(
        <div key={day} className="dayRow">
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
              <h1>{format( activeDate , "MMMM yyyy")}</h1>
              <AiOutlineRight
                className="navIcon"
                onClick={() => setActiveDate(addMonths(activeDate, 1))}
                />
          </div>
          <div className="calendar-table">
                {daysInWeek}
                {getDates()}
                { showPopUp && <Popup colour={colour} message={message} /> }
          </div>
        </div>
    )
}