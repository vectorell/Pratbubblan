import { useRecoilState } from 'recoil'
import './AddAccount.css'
import { loginState } from '../../../recoil/atoms/loginState'
import { useEffect, useRef, useState } from 'react'
import { putExistingUser } from '../../../utils/AJAX/users/putExistingUser'
import { useParams } from 'react-router'
import { deleteUser } from '../../../utils/AJAX/users/deleteUser'
import { useNavigate } from 'react-router'
import { postNewUser } from '../../../utils/AJAX/users/postNewUser'

export function AddAccount() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [confirmation, setConfirmation] = useState(false)

    const usernameInput = useRef(null)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const {uuid} = useParams()

    const navigate = useNavigate()


    async function handleClick(e) {
        e.preventDefault()

        let newUsername = usernameInput.current.value
        let newEmail = emailInput.current.value
        let newPassword = passwordInput.current.value

        let reqBody = {
            name: newUsername,
            mail: newEmail,
            password: newPassword,
            token: isLoggedIn.token
        }

        let check = await postNewUser(reqBody)

        usernameInput.current.value = ''
        emailInput.current.value = ''
        passwordInput.current.value = ''
    }
    
    return (
        <div className="EditAccount">
            <h1> Hej, {isLoggedIn.name}! </h1>
            <h2> Lägg till ett nytt konto </h2>

            <form>
                <div>
                    <p> Användarnamn: </p>
                    <input type="text" ref={usernameInput}/>
                </div>
                <div>
                    <p> Mailadress: </p>
                    <input type="text" ref={emailInput}/>
                </div>
                <div>
                    <p> Lösenord: </p>
                    <input type="password" ref={passwordInput}/>
                </div>

                <div>
                    <button onClick={handleClick}> Spara ny användare </button>
                </div>

            </form>

        </div>
    )
}