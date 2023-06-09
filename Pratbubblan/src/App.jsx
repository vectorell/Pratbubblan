import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { LoginPage } from './components/Login/LoginPage'
import { MainContent } from './components/MainContent/MainContent'
import { getAllChannels } from './utils/AJAX/channels/getAllChannels'
import { channelsState } from './recoil/atoms/channelsState'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'

function App() {
  // const [channels, setChannels] = useRecoilState(channelsState)
  


  // setChannels(getAllChannels())

  return (
    <div className="App">
      <div>
        <LoginPage/>
      </div>
      <MainContent/>
    
    </div>
  )
}

export default App
