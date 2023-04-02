import reactDom from 'react-dom/client'
import react from 'react'
import App from './src/App'


const root = reactDom.createRoot(document.querySelector('#root'))
root.render(<App />)