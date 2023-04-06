import React, {useState, useRef, useEffect } from "react";
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
  // const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    // console.log(lefttoolbar)
    // console.log(righttoolbar)
  }, [lefttoolbar, righttoolbar,space])

  return (
    <div className="work-area" style={{ marginTop: space.top }}>
      <Navbar />

      <Editor style={{ left: 0, top: 0, width: `calc( 100vw - ${(space.right)}px )`, height: `calc( 100vh - ${space.top}px )` }} />
      <Toolbar align="left" width={40} style={{ top: space.top }} items={lefttoolbar} selected={(e, v) => {

         dispatch(actions.setState({keys:"toolbar.left."+v.id,value:{active:!v.active},only:true}))
      
      }} />
      <Toolbar align="right" width={40} style={{ top: space.top }} items={righttoolbar} selected={(e, v) => {
      dispatch(actions.setState({keys:"toolbar.right."+v.id,value:{active:!v.active},only:true}))
      dispatch(actions.setState({keys:"workspace.right",value:!v.active?300:40}))
      // console.log(space.right)

      }}
      />
    </div>


  )
}
