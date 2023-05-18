import React from 'react'

export default function Popup({ colour , detail }){
    // console.log( message )
    return(
      <div className={`Popup ${colour}`}>{detail}</div>
    )
  }