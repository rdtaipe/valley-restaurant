import React, { useRef, useEffect } from "react";
import Moveable from "./Canvas/Canvas";
import './App.css'
export default function WorkArea(props) {


  return (

      <div className="work-area">
        <Moveable />
      </div>

    
  )
}
