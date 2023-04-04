import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from './Redux/Store'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'


export default function Start(props) {
    const dispatch = useDispatch()
    dispatch(actions.setState({keys:"actions",value:actions}))
  
    return (
        <>
      <RouterProvider router={Routes}/> 
            
        </>
    )
}
