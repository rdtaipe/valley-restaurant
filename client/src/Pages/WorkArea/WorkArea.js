import React, { useRef, useEffect } from "react";
import Moveable from "./Moveable/Moveable";
import './App.css'
export default function WorkArea(props) {


  return (

      <div className="work-area">
        <Moveable />
      </div>

    
  )
}
