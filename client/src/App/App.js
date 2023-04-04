import React from 'react'
import Navbar from '../Components/Navbar'
import {Tables} from '../Assets/Objets/Tables'
import WorkArea from '../Pages/WorkArea/WorkArea'
export default function App(props) {
    

    return (
        <div>
            {/* <Navbar left={<h1>home</h1>}/> */}
            {/* <Tables type={1} style={{width:500,height:200}}/> */}
            <WorkArea/>
        </div>
    )
}

