import reactDom from 'react-dom/client'
import react from 'react'
// reduxtulkit
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import Start from './Start'


const root = reactDom.createRoot(document.querySelector('#root'))
root.render(
    <>
    <Provider store={Store}>
        <Start />
    </Provider>
    </>
)