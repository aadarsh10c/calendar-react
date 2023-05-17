
//Convert the JSON data into a map with key as date
const parseResponseToMap = ( obj ) => {

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