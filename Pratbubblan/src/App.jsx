import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { MainContent } from './components/MainContent/MainContent'
import { getAllChannels } from './utils/AJAX/channels/getAllChannels'
import { channelsState } from './recoil/atoms/channelsState'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { loggedInUser } from './recoil/atoms/loggedInUser'
import { loginState } from './recoil/atoms/loginState'

function App() {
  // const [channels, setChannels] = useRecoilState(channelsState)
  const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
  
  async function checkIfLoggedIn() {
    let rawCookie = document.cookie

    if(rawCookie) {
      let cookie = JSON.parse(rawCookie.split('=')[1])
      setIsLoggedIn(cookie)


      // setUserLoggedIn(true)
    }
    return


  }

  useEffect(() => {
    checkIfLoggedIn()
  }, [])

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
