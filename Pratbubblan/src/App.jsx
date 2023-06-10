import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
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
        <Header/>
      </div>
      <MainContent/>
    
    </div>
  )
}

export default App
