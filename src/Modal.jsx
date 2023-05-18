import React , { useEffect } from "react";
import InfoBox from "./InfoBox";

export default function Modal( { timeSheet, closeModal }){
    // console.log( timeSheet )
    return(
        <div className="modal" onClick={closeModal}>
            <InfoBox timeSheet={ timeSheet } closeInfo = {closeModal}/>
        </div>
    )
}