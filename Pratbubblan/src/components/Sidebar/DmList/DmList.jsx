import { useRecoilState } from "recoil"
import { usersListState } from "../../../recoil/atoms/usersState"
import { loginState } from "../../../recoil/atoms/loginState"
import { NavLink } from "react-router-dom"
import './DmList.css'
import { loggedInUser } from "../../../recoil/atoms/loggedInUser"
import { useEffect } from "react"

export function DmList() {
    const [users, setUsers] = useRecoilState(usersListState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)

    function filterOutLoggedInUser() {
        // console.log(userLoggedIn)
        let filteredUsers = users.filter(user => user.name !== userLoggedIn)
        return filteredUsers
    }
    useEffect(() => {
        filterOutLoggedInUser()
    })

    return (
        <div className="DmList">
            <h3>  Direktmeddelanden  </h3>
            { isLoggedIn &&
                users && filterOutLoggedInUser().map((user, index) => (
                <NavLink
                to={`/${user._id}`} 
                    key={index}
                    >
                    
                    <p>{user.name}</p>
                    
                </NavLink> 
                ))}

            
            
            
        </div>
            )
}

// })}))
// ))})}