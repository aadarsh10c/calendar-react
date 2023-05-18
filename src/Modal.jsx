import React from "react";

export default function Modal( { closeModal }){
    return(
        <div className="modal" onClick={closeModal}>
            <h1>
                MODAL IS HERE
            </h1>
        </div>
    )
}