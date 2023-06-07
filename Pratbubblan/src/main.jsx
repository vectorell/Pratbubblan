import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { router } from './routeConfig.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from './routes/Login/LoginPage.jsx'


export const router = createBrowserRouter([
    {
        path: '',
        element: <LoginPage />,
        children: [
            {
                path: ' ',
                element: <App />
            },
            {

            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
