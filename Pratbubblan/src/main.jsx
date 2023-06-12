import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { router } from './routeConfig.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header/Header.jsx'
import { RecoilRoot } from 'recoil'
import { Channel } from './routes/Channel.jsx'
import { EditAccount } from './routes/editAccount/EditAccount.jsx'
import { loginState } from './recoil/atoms/loginState.js'
import { useRecoilState } from 'recoil'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/:channelId',
          element: <Channel />
        },
        {
          path: '/account/:uuid',
          element: <EditAccount />
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
