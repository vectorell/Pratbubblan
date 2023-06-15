import { useRecoilState } from 'recoil'
import { loginUser } from '../../utils/AJAX/users/loginUser'
import './Header.css'
import { useRef } from 'react'
import { loginState } from '../../recoil/atoms/loginState'
import { loggedInUser } from '../../recoil/atoms/loggedInUser'
import { NavLink } from 'react-router-dom'
import { getAllChannels } from '../../utils/AJAX/channels/getAllChannels'
import { getPrivateChannels } from '../../utils/AJAX/privateChannels/getPrivateChannels'
import { privateChannelsState } from '../../recoil/atoms/privateChannelsState'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Header({rerender, setRerender}) {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
    const [privateChannels, setPrivateChannels] = useRecoilState(privateChannelsState)
    const navigate = useNavigate();
    // const [rerender, setRerender] = useState(0)

    const inputUsername = useRef(null)
    const inputPassword = useRef(null)

    async function fetchPrivateChannels(token) {
        // let testCookie = document.cookie.split('=')[1]
        // if (testCookie === '' || testCookie === undefined || testCookie === null) {
        //     return
        // }
        try {
            let fetchedPrivateChannels = await getPrivateChannels(token)
            setPrivateChannels(fetchedPrivateChannels)
            // console.log(channels)
        } catch (error) {
            
        }
    }

    async function handleClick(e) {
        e.preventDefault()

        let username = inputUsername.current.value
        let password = inputPassword.current.value

        if (username === "" || password === "") {
            return
        }

        // let result = await 
        // console.log(result)
        let user = await loginUser(username, password)
        // console.log(user)

        if (user === undefined) {
            return
        }

        setIsLoggedIn(user)
        // setIsLoggedIn(!isLoggedIn)
        // console.log(isLoggedIn)
        // console.log(user)
        setUserLoggedIn(user)
        // console.log('userLoggedIn: ', userLoggedIn)

        await fetchPrivateChannels(user.token)

        let d = new Date()
        d.setTime(d.getTime() + (1*60*60*1000))
        document.cookie = `user_cookie=${JSON.stringify(user)}; expires=${d.toUTCString()}`
    }

    async function handleLogout() {
        // document.cookie = "user_cookie; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        let d = new Date()
        d.toUTCString
        // console.log(d)
        document.cookie=`user_cookie=; `
        navigate("/")
        setRerender(rerender + 1)
        setIsLoggedIn('')
        setPrivateChannels([])
        return
    }

    return (
        <div className="Header">
            <h1>Pratbubblan</h1>

            {!isLoggedIn && (
                <form>
                    <div>
                        <p> Användarnamn </p>
                        <input ref={inputUsername} type="text"/>
                    </div>
    
                    <div>
                        <p> Lösenord </p>
                        <input ref={inputPassword} type="password"/>
                    </div>
                    <button onClick={handleClick}> Logga in </button>
                </form>
            )}



            {isLoggedIn && (
                <div className='dashboard'>
                    <p>Inloggad som <strong>{isLoggedIn.name}</strong></p>
                    <div>
                    <button>  
                        <NavLink className="header-buttons" to={`/account/new`}> Lägg till nytt konto </NavLink>
                    </button>
                    <button>  
                        <NavLink className="header-buttons" to={`/account/${isLoggedIn.uuid}`}> Redigera konto </NavLink>
                    </button>
                    <button className="header-buttons" onClick={handleLogout}> Logga ut </button>
                    </div>
                    
                </div>
            )}


        </div>
    )
}