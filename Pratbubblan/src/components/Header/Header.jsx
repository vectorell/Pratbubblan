import { useRecoilState } from 'recoil'
import { loginUser } from '../../utils/AJAX/users/loginUser'
import './Header.css'
import { useRef } from 'react'
import { loginState } from '../../recoil/atoms/loginState'
import { loggedInUser } from '../../recoil/atoms/loggedInUser'
import { NavLink } from 'react-router-dom'

export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)

    const inputUsername = useRef(null)
    const inputPassword = useRef(null)

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
        console.log(user)

        if (user === undefined) {
            return
        }

        setIsLoggedIn(user)
        // setIsLoggedIn(!isLoggedIn)
        console.log(isLoggedIn)
        console.log(user)
        setUserLoggedIn(user)
        // console.log('userLoggedIn: ', userLoggedIn)

        let d = new Date()
        d.setTime(d.getTime() + (1*60*60*1000))
        document.cookie = `user_cookie=${JSON.stringify(user)}; expires=${d.toUTCString()}`
        
        

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
                <div>
                    <p>Inloggad som <strong>{isLoggedIn.name}</strong></p>
                    <button>  
                        <NavLink to={`/account/${isLoggedIn.uuid}`}> Redigera konto </NavLink>
                        </button>
                    
                    <button> Logga ut </button>
                </div>
            )}


        </div>
    )
}