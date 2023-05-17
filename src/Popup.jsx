import React from 'react'

export default function Popup({ colour , message }){
    console.log( message )
    return(
      <div className={`Popup ${colour}`}>{message}</div>
    )
  }