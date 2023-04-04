import{createBrowserRouter} from 'react-router-dom'
import App from '../App/App';

export default createBrowserRouter([
  // defauld rute
  {
    path: '/',
    element:<App/>,
    // children: [
    //   {
    //     path: '/dashboard',
    //     element: <Dashboard/>
        
    //   },{
    //     path: '/houses',
    //     element:<Houses />
    //   },{
    //     path: '/products',
    //     element:<Products />
    //   },{
    //     path: '/users',
    //     element:<Clients />
    //   },{
    //     path: '/sales',
    //     element:<Sales />
    //   },{
    //     path: '/projects',
    //     element:<Projects />
    //   },{
    //     path: '/projects',
    //     element:<Projects />
    //   },{
    //     path: '/employees',
    //     element:<Employees />
    //   },{
    //     path: '/roles',
    //     element:<Roles />
    //   },{
    //     path: '/permissions',
    //     element:<Permissions />
    //   }
    // ]
  },
  ]);


