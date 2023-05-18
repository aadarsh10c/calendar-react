import React from "react";
import { FaRegWindowClose } from 'react-icons/fa'

export default function InfoBox({timeSheet,closeModal}){

    // if timesheet exists get the comments and userId
    let userId = timeSheet && ( timeSheet.userId ?? '')
    let comments = timeSheet && ( timeSheet.comments ?? [])
    // console.log( comments )
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
            { timeSheet == null ? <h2>Timsheet Detail Not Recorded</h2> :
                <>
                
                <div className="info-main">
                    <p>Name : { timeSheet.employeeName ?? ''}</p>
                    <p>Date : { timeSheet.date ?? ''}</p>
                    <p>Working Hours : { timeSheet.workingHours ?? 0} HRS</p>
                    <p>Leave : { timeSheet.leave ??  'No Leave' }</p>
                </div>
                <div className="info-comment">
                    { comments.length > 0 ? 
                    comments.map( item => (
                    <>
                        <p>
                            Comment: { item.comment}
                        </p> 
                        <p>
                            CommentID: { item.commentId}
                        </p>
                        <p>
                            Commented By: { item.commentedBy}
                        </p>
                        <p>
                            Date: { item.date}
                        </p>
                    </> 
                    ))
                    : <p>No Comments Yet</p>
                    }
                </div>
                </>
            }
            
        </div>
    )
}