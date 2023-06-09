import { useRecoilState } from 'recoil'
import { loginUser } from '../../utils/AJAX/users/loginUser'
import './LoginPage.css'
import { useRef } from 'react'
import { loginState } from '../../recoil/atoms/loginState'

export function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)

    const inputUsername = useRef(null)
    const inputPassword = useRef(null)

    async function handleClick(e) {
        e.preventDefault()

        let username = inputUsername.current.value
        let password = inputPassword.current.value

        // let result = await 
        // console.log(result)

        // setIsLoggedIn(await loginUser(username, password)) 
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <div className="LoginPage">
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



            {isLoggedIn && <p>Inloggad!</p>}


        </div>
    )
}