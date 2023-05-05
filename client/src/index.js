import reactDom from 'react-dom/client'
// reduxtulkit
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from './Redux/Store'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'

function SetterProvider() {
    const dispatch = useDispatch()
    dispatch(actions.setActions(actions))
    return (<></>)
}


const root = reactDom.createRoot(document.querySelector('#root'))
root.render(
    <Provider store={Store}>
        <SetterProvider/>
        <RouterProvider router={Routes} />
    </Provider>

)