import React, { useRef, useEffect } from "react";
import Editor from "./Editor/Editor";
import Toolbar from "./Toolbar/Toolbar";
import { useSelector, useDispatch } from 'react-redux'
// import keycon
import { copyImageToClipboard } from 'copy-image-clipboard';
// import {} from 'keycon'
import Navbar from "./Components/Navbar";
export default function WorkArea(props) {

  const dispatch = useDispatch()
  const actions = useSelector(state => state.actions)
  const lefttoolbar = useSelector(state => state.toolbar.left)
  const righttoolbar = useSelector(state => state.toolbar.right)
  const space = useSelector(state => state.workspace)

  useEffect(() => {
    // console.log(lefttoolbar)
    // console.log(righttoolbar)
  }, [lefttoolbar, righttoolbar])

  return (
    <div className="work-area" style={{ marginTop: space.top }}>
      <Navbar />

      <Editor style={{ left: space.left, bottom: 0, width: `calc( 100vw - ${(space.left * 2)}px )`, height: `calc( 100vh - ${space.top}px )` }} />
      <Toolbar align="left" width={40} style={{ top: space.top }} items={lefttoolbar} selected={(e, v) => {
        // console.log(v.ac)
        // console.log(actions)

     
  
         dispatch(actions.setState({keys:"toolbar.left."+v.id,value:{active:true},only:true}))
        console.log(lefttoolbar)

      }} />
      <Toolbar align="right" width={40} style={{ top: space.top }} items={righttoolbar} selected={(e, v) => {
        console.log(e, v)
      }}
      />
    </div>


  )
}
