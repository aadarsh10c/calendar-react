import { useState } from 'react'

import Description from './components/Description'
import Calendar from './components/Calendar'

import timeSheetJSON from './assets/timeSheet.json'
import  holidayJSON from './assets/holiday'

import { parseResponseToMap } from './utils/util'


function App() {

  //Convert the JSON data into a map with key as date
  const holidayMap = parseResponseToMap( holidayJSON ) 
  const timeSheetMap = parseResponseToMap( timeSheetJSON )

  const totalHours = timeSheetJSON.body.totalWorkingHours
  const TimeOFFMay = timeSheetJSON.body.totalPTOHours

  return (
    <>
      <div className='container flex justify-between'>
          <Calendar holidayMap={ holidayMap } timeSheetMap={timeSheetMap} />
          <Description response = { { totalHours, TimeOFFMay  } } />
      </div>
      
    </>
  )
}

export default App
