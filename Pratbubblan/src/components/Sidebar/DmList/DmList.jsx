import { useRecoilState } from "recoil";
import { usersListState } from "../../../recoil/atoms/usersState";
import { loginState } from "../../../recoil/atoms/loginState";
import { Link } from "react-router-dom";
import "./DmList.css";
import { loggedInUser } from "../../../recoil/atoms/loggedInUser";
import { fetchOrCreateConversation } from "../../../utils/AJAX/conversation/fetchOrCreateConversation";
import { currentConversationState } from "../../../recoil/atoms/currentConversationState";
import { currentRecieverState } from "../../../recoil/atoms/currentReciever";

export function DmList() {
    const [users, setUsers] = useRecoilState(usersListState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [currentConversation, setCurrentConversation] = useRecoilState(
        currentConversationState
    );
    const [currentReciever, setCurrentReciever] =
        useRecoilState(currentRecieverState);

    // TODO
    function filterOutLoggedInUser() {
        let filteredUsers = users.filter(
            (user) => user.name !== isLoggedIn.name
        );
        return filteredUsers;
    }

    async function handleClick(currentUser, recieverUser, token) {
        let check = await fetchOrCreateConversation(
            currentUser,
            recieverUser._id,
            token
        );
        setCurrentConversation(check);
        // console.log("check: ", check);
        setCurrentReciever(recieverUser);
    }

    return (
        <div className="DmList">
            <h3> Direktmeddelanden </h3>
            {isLoggedIn &&
                users &&
                filterOutLoggedInUser().map((user, index) => (
                    <Link
                        to={`/messages/${currentConversation._id}`}
                        key={index}
                        onClick={() =>
                            handleClick(isLoggedIn.uuid, user, isLoggedIn.token)
                        }
                    >
                        <p>{user.name}</p>
                    </Link>
                ))}
            {!isLoggedIn && <p> Var god logga in för denna vy</p>}
        </div>
    );
}
