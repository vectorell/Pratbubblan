import './App.css'
import { Header } from './components/Header/Header'
import { MainContent } from './components/MainContent/MainContent'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { loggedInUser } from './recoil/atoms/loggedInUser'
import { loginState } from './recoil/atoms/loginState'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Outlet } from 'react-router'

function App() {
  // const [channels, setChannels] = useRecoilState(channelsState)
  const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
  
  async function checkIfLoggedIn() {
    let rawCookie = document.cookie

    if(rawCookie) {
      let cookie = JSON.parse(rawCookie.split('=')[1])
      setIsLoggedIn(cookie)
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
      {/* <Sidebar /> */}
    
    </div>
  )
}

export default App
