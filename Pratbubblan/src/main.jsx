import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { router } from './routeConfig.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from './components/Login/LoginPage.jsx'
import { RecoilRoot } from 'recoil'
import { Channel } from './routes/Channel.jsx'


export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/channels/:id',
          element: <Channel />
        }
      ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
)
