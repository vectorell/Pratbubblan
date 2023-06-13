import { useRecoilState } from "recoil"
import { usersListState } from "../../../recoil/atoms/usersState"
import { loginState } from "../../../recoil/atoms/loginState"
import { NavLink } from "react-router-dom"
import './DmList.css'
import { loggedInUser } from "../../../recoil/atoms/loggedInUser"
import { useEffect } from "react"
import { fetchOrCreateConversation } from "../../../utils/AJAX/conversation/fetchOrCreateConversation"
import { currentConversationState } from "../../../recoil/atoms/currentConversationState"
import { currentRecieverState } from "../../../recoil/atoms/currentReciever"

export function DmList() {
    const [users, setUsers] = useRecoilState(usersListState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
    const [currentConversation, setCurrentConversation] = useRecoilState(currentConversationState)
    const [currentReciever, setCurrentReciever] = useRecoilState(currentRecieverState)

    // TODO
    function filterOutLoggedInUser() {
        // console.log(userLoggedIn)
        let filteredUsers = users.filter(user => user.name !== isLoggedIn.name)
        return filteredUsers
    }
    useEffect(() => {
        filterOutLoggedInUser()
    })

    async function handleClick(currentUser, recieverUser, token) {

        setCurrentConversation(await fetchOrCreateConversation(currentUser, recieverUser._id, token))
        // setTimeout(() => {
        //     console.log(currentConversation._id)
        // }, 1000)
        setCurrentReciever(recieverUser)
    }
    
    return (
        <div className="DmList">
            <h3>  Direktmeddelanden  </h3>
            { isLoggedIn &&
                users && filterOutLoggedInUser().map((user, index) => (
                <NavLink
                to={`/messages/${currentConversation._id}`} 
                    key={index}
                    onClick={() => handleClick(isLoggedIn.uuid, user, isLoggedIn.token)}
                    >
                    
                    <p>{user.name}</p>
                    
                </NavLink> 
                ))}
            {!isLoggedIn && <p> Var god logga in för denna vy</p>}
            
            
            
        </div>
            )
}

// })}))
// ))})}