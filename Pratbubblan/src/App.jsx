import './App.css'
import { Header } from './components/Header/Header'
import { MainContent } from './components/MainContent/MainContent'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { loggedInUser } from './recoil/atoms/loggedInUser'
import { loginState } from './recoil/atoms/loginState'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Outlet } from 'react-router'
import { privateChannelsState } from './recoil/atoms/privateChannelsState'
import { getPrivateChannels } from './utils/AJAX/privateChannels/getPrivateChannels'

function App() {
  // const [channels, setChannels] = useRecoilState(channelsState)
  const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
  const [privateChannels, setPrivateChannels] = useRecoilState(privateChannelsState)

  
  async function checkIfLoggedIn(token) {
    let rawCookie = document.cookie

    // let testCookie = rawCookie.split('=')[1]

    // if (testCookie === '') {
    //   return
    // }

    if(rawCookie) {
      let cookie = JSON.parse(rawCookie.split('=')[1])
      setIsLoggedIn(cookie)
    }
    return
  }
  
  useEffect(() => {
    checkIfLoggedIn()
  }, [])

  useEffect(() => {
    // fetchPrivateChannels(isLoggedIn.token)
  }, [])

  // setChannels(getAllChannels())

//   async function fetchPrivateChannels(token) {
//     console.log('fetchPrivateChannels: token: ', await token);
//     // let testCookie = document.cookie.split('=')[1]
//     // if (testCookie === '' || testCookie === undefined || testCookie === null) {
//     //     return
//     // }
//     try {
//         let fetchedPrivateChannels = await getPrivateChannels(token)
//         setPrivateChannels(await fetchedPrivateChannels)
//         // console.log(channels)
//     } catch (error) {
        
//     }
// }

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
