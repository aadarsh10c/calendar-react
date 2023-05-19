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
        addMonths,
        getDay
     } from 'date-fns'

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

//import utility function
import { isSatOrSun } from './util'

//import important constants
import {_HOLIDAY,_INVALID, _HIDE, _SHOW_POPUP, _SHOW_MODAL } from './constants'

//import componenets
import Popup from "./Popup";
import Modal from "./Modal";


export default function Calendar( { holidayMap , timeSheetMap }){

    //Constants are stored in constants.js file
    const [ showPopUp , setShowPopUp ] = React.useState( _HIDE ) // popup modal has two states 'hide' and 'popup'
    const [ showModal , setShowModal ] = React.useState( _HIDE ) //info modal has two states 'hide' and 'modal'
    
    //track today's date 
    const [ activeDate , setActiveDate] = useState( new Date ())

    //used to set modal properties
    const [ colour , setColour ] = useState( null )
    const [ detail , setDetail ] = useState( null )

    
    //set showPopup to false,so that it can be reused for popups and dialogs
    React.useEffect(() => {
        const timer = setTimeout(() => {
        setShowPopUp(_HIDE);
      }, 2000);
     return () => clearTimeout(timer);
     }, [showPopUp]);
    

    //handle popup and modal state on click event
    const handleClick = ( dateString, { isDayGreaterthanToday, isWeekEnd }  ) => {

        //if date is holiday
        if (holidayMap.has(dateString))
        { 
            setColour(_HOLIDAY)
            setDetail( holidayMap.get( dateString ).reason )            
            setShowPopUp( _SHOW_POPUP )
        }
        else if ( isWeekEnd ) //if date is weekend
        {
            setColour(_INVALID)
            setDetail( 'Weekend')
            setShowPopUp( _SHOW_POPUP )
        }
        else if ( isDayGreaterthanToday > 0 ) //if date is greater than today's date
        {
            setColour(_INVALID)
            setDetail( 'InActive Date')
            setShowPopUp( _SHOW_POPUP )
        } 
        else
        {   //finally if date is a working date
            setShowModal(_SHOW_MODAL)
            let timesheet = timeSheetMap.has( dateString ) ? timeSheetMap.get( dateString ) : null
            setDetail(() => timesheet )
        }
    }


    //function to check whether the date is present in a given map or not
    const hasDate = ( dateString, map1, map2 ) =>  map1.has( dateString ) || map2.has( dateString ) 

    

    //function to get the widget
    const getWidget = ( formatedDate, holidayMap ,timeSheetMap ) => {
        let styleOfWidget = '' //set colour and other properties
        let value = '' //to display on widget

        //if date is a holiday
        if( holidayMap.has(formatedDate) ){
            styleOfWidget = 'holiday'
            value = holidayMap.get(formatedDate).reason
        }else{
            //if date is present in working timesheet, set widget accordingly
            if(timeSheetMap.has(formatedDate) ){ 
                const timeSheet = timeSheetMap.get(formatedDate)

                const leave = timeSheet.leave
                const workingHours = timeSheet.workingHours
                const hasComments = timeSheet.comments.length

                if( hasComments > 0){
                    styleOfWidget = 'commented'
                    value = `${workingHours} HRS`
                }else{
                    styleOfWidget = 'working'
                    value = `${workingHours} HRS`
                }

                if( leave ) {
                    value = `${leave}`
                    styleOfWidget = 'leave'
                }
            }
        }

        return<><p className={styleOfWidget}>{value}</p></>
    }

    //function to populate the dates for a week
    const getDatesForCurrentWeek = ( date  , activeDate ) => {

        let currentDate = date
        const week = []
        for( let day = 0; day < 7; day++ ){

            let formatedDate = format( currentDate , 'yyyy-MM-dd')

            //check whether the date is eventful ie, Time OFF / Working
            const isEvent = hasDate( formatedDate, holidayMap , timeSheetMap )

            const isDayinSameMonth = isSameMonth( currentDate , activeDate )
            const isDayGreaterthanToday = compareAsc( currentDate , new Date())

            //check whether day is Sat or sun
            const isWeekEnd = isSatOrSun( currentDate )

            //create cell style for each day , determined by various condition
            const cellStyle = `date flex flex-column ${isEvent ?'justify-between':''} ${isEvent ? 'align-center': 'justify-start'} ${  
                isDayinSameMonth ? '' : 'inactiveDay' } ${ isWeekEnd ? 'inactiveDay' : '' } 
                ${isSameDay( currentDate , new Date()) ? 'bg-tr-pink' : ''} ${
                        isDayGreaterthanToday > 0 ? 'inactiveDay' : ''}`

            week.push(
                <div key={formatedDate} className={cellStyle} onClick={() => handleClick(formatedDate , {isDayGreaterthanToday , isWeekEnd})}>
                    {format( currentDate, 'd')}
                    { isEvent && getWidget( formatedDate, holidayMap ,timeSheetMap )}
                </div>
            )
            currentDate = addDays( currentDate, 1)
        }
        return <>{week}</>
    }

    //funtion to get dates for the calender
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
        return allWeeks

    }

    const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    //Returns React element populated with day names
    const daysInWeek = [ ...WEEKDAYS].map( day => {
        return(
        <div key={day} className="dayRow">
            {day}
        </div>
    )}) 
    return(
        <div className="calendar">
          <div className="calendar-nav flex align-center justify-between">
            <AiFillCaretLeft
                className="navIcon"
                onClick={() => setActiveDate(subMonths(activeDate, 1))}
            />
              <h1>{format( activeDate , "MMMM yyyy")}</h1>
              <AiFillCaretRight
                className="navIcon"
                onClick={() => setActiveDate(addMonths(activeDate, 1))}
                />
          </div>
          <div className="calendar-table">
                {daysInWeek}
                {getDates()}
                { (showPopUp === _SHOW_POPUP ) && <Popup colour={colour} detail={detail} /> }
                { (showModal === _SHOW_MODAL ) && <Modal timeSheet={ detail } closeModal={ () => setShowModal(_HIDE)} />} 
          </div>
        </div>
    )
}