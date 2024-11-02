import React, { Component } from 'react'
import Hourglass from './Hourglass.gif'
const Spinner = () => {
  
    return (
      <div className ="text-center">
        <img src={Hourglass} alt="loading" />
      </div>
    )
  
}
export default Spinner;