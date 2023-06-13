import { useParams } from "react-router"
import { useRecoilState } from "recoil"
import { currentConversationState } from "../../recoil/atoms/currentConversationState"
import { loginState } from "../../recoil/atoms/loginState"
import { useRef } from "react"
import { getSpecificUser } from "../../utils/AJAX/users/getSpecificUser"
import { currentRecieverState } from "../../recoil/atoms/currentReciever"
import { postDmMessage } from "../../utils/AJAX/dmMessages/postDmMessage"
import './Messages.css'
import { fetchOrCreateConversation } from "../../utils/AJAX/conversation/fetchOrCreateConversation"


export function Messages() {
    const [currentConversation, setCurrentConversation] = useRecoilState(currentConversationState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [currentReciever, setCurrentReciever] = useRecoilState(currentRecieverState)
    const {conversationId} = useParams()

    const messageInput = useRef(null)


    function handleClick(e) {
        e.preventDefault()
        sendMessage()
    }

    async function sendMessage() {
        function containsOnlySpaces(string) {
            return /^\s*$/.test(string)
        }

        if (containsOnlySpaces(messageInput.current.value)) {
            return
        }

        if (messageInput.current.value === '') {
            return
        }

        let sender = await getSpecificUser(isLoggedIn.uuid)

        let msgObject = {
            msgBody: messageInput.current.value,
            senderId: sender._id,
            senderName: isLoggedIn.name,
            recieverId: currentReciever._id,
            recieverName: currentReciever.name,
            token: isLoggedIn.token,
            conversationId: currentConversation._id
        }

        console.log(msgObject)

        await postDmMessage(msgObject)
        messageInput.current.value = ''

        console.log('currentReciever: ', currentReciever)
        await fetchOrCreateConversation(isLoggedIn.uuid, currentReciever._id, isLoggedIn.token)

        console.log('currentConversation: ', currentConversation)

        setCurrentConversation((prevConversation) => {
            const updatedMessages = [...prevConversation.messages, msgObject];
            return { ...prevConversation, messages: updatedMessages }
        })
    }

    return (
        <div className="Messages">
            <div className="channel-title">
                <h2> Direktmeddelande till: </h2>  
                <h1> {currentReciever.name} </h1>
            </div>

            {currentConversation &&
                currentConversation.messages.map((message, index) => (
                    <div key= {index}>
                    <div className="message">
                        <h4> {message.senderName}:</h4>
                        <p>{message.msgBody}   </p>
                    </div>
                    <p id="sent-at">{message.sentAt}</p>
                    </div>
                ))
            }

            {isLoggedIn &&
            <form>
                <input type="text" ref={messageInput}/>
                <button onClick={handleClick}> Skicka </button>
            </form>
        }
        
        </div>
    )
}