import { getDay } from "date-fns"
//Convert the JSON data into a map with key as date
export const parseResponseToMap = ( obj ) => {

    let dataArray = []

    if (!obj.body?.timeSheetlist){
        dataArray = [ ...obj.body ]
    }else{
        dataArray = [ ...obj.body.timeSheetlist]
    }
    const dataMap = new Map() 
    dataArray.forEach( item => {
        dataMap.set( item.date , item )  
    })
    return dataMap
}

//function to determine whether the date is Week end or not
export const isSatOrSun = ( date ) => {
    const result = getDay( date )
    //0 => Sun , 6 => Sat
    return (result === 0 || result === 6)
}