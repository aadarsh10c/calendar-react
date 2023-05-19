import { tr } from "date-fns/locale";
import React from "react";
import { FaRegWindowClose } from 'react-icons/fa'

export default function InfoBox({timeSheet,closeModal}){

    // if timesheet exists get the comments and userId
    let userId = timeSheet && ( timeSheet.userId ?? '')
    let comments = timeSheet && ( timeSheet.comments ?? [])

    //Create table of comments
    let createTableRows = []
    if( timeSheet != null && comments.length > 0 ){
    createTableRows = comments.map( item => (
        <tr className='tableRow'>
            <td>{item.comment ?? ''}</td>
            <td>{item.commentedBy ?? 'Unknown'}</td>
            <td>{item.date ?? 'No Date Given'}</td>
        </tr>

    ))

    }
    return(
        <div className="info" >
            <div className="info-head">
                    <h3>
                        USER ID : { userId ?? '' }
                    </h3>
                    <FaRegWindowClose 
                    className="info-closeBtn"
                    onClick={closeModal} />
            </div>
            { timeSheet == null ? <h2>Timsheet Data Not Recorded</h2> :
                <>
                
                <div className="info-main">
                    <p>Name : { timeSheet.employeeName ?? ''}</p>
                    <p>Date : { timeSheet.date ?? ''}</p>
                    <p>Working Hours : { timeSheet.workingHours ?? 0} HRS</p>
                    <p>Leave : { timeSheet.leave ??  'No Leave' }</p>
                </div>
                <div className="info-comment">
                    { comments.length > 0 ? 
                    <>
                        <table className='commentTable'>
                            <thead className='tableHead'>
                            <th>Comment</th>
                            <th>Comment By</th>
                            <th>Date</th>
                            </thead>
                            <tbody>
                            {createTableRows}
                            </tbody>
                        </table>
                    </>
                    
                    : <p>No Comments Yet</p>
                    }
                </div>
                </>
            }
            
        </div>
    )
}