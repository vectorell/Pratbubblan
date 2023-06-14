import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { currentConversationState } from "../../recoil/atoms/currentConversationState";
import { loginState } from "../../recoil/atoms/loginState";
import { useEffect, useRef, useState } from "react";
import { getSpecificUser } from "../../utils/AJAX/users/getSpecificUser";
import { currentRecieverState } from "../../recoil/atoms/currentReciever";
import { postDmMessage } from "../../utils/AJAX/dmMessages/postDmMessage";
import "./Messages.css";
import { fetchOrCreateConversation } from "../../utils/AJAX/conversation/fetchOrCreateConversation";
import { putEditMessage } from "../../utils/AJAX/dmMessages/putEditMessage";
import { deleteMsg } from "../../utils/AJAX/dmMessages/deleteMsg";


export function Messages() {
    const [currentConversation, setCurrentConversation] = useRecoilState(
        currentConversationState
    );
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [currentReciever, setCurrentReciever] =
        useRecoilState(currentRecieverState);
    const [editMessage, setEditMessage] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(false);
    const { conversationId } = useParams();
    const [clickedUser, setClickedUser] = useState('')
    const [editInputValue, setEditInputValue] = useState('')
    const [updateComponent, setUpdateComponent] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(0)

    const messageInput = useRef(null);
    const editMessageInput = useRef(null);

    function handleClick(e) {
        e.preventDefault();
        sendMessage();
    }

    async function sendMessage() {
        console.log("sendMessage: isLoggedIn.token: ", isLoggedIn.token);
        function containsOnlySpaces(string) {
            return /^\s*$/.test(string);
        }

        if (containsOnlySpaces(messageInput.current.value)) {
            return;
        }

        if (messageInput.current.value === "") {
            return;
        }

        let sender = await getSpecificUser(isLoggedIn.uuid);

        let msgObject = {
            msgBody: messageInput.current.value,
            senderId: sender._id,
            senderName: isLoggedIn.name,
            recieverId: currentReciever._id,
            recieverName: currentReciever.name,
            token: isLoggedIn.token,
            conversationId: currentConversation._id,
        };

        console.log(msgObject);

        await postDmMessage(msgObject);
        messageInput.current.value = "";

        console.log("currentReciever: ", currentReciever);
        await fetchOrCreateConversation(
            isLoggedIn.uuid,
            currentReciever._id,
            isLoggedIn.token
        );

        console.log("currentConversation: ", currentConversation);

        setCurrentConversation((prevConversation) => {
            const updatedMessages = [...prevConversation.messages, msgObject];
            return { ...prevConversation, messages: updatedMessages };
        });
    }

    // function handleMessage(e) {
    //     // setEditMessage(!editMessage)
    //     // console.log(e.nativeEvent)
    //     // console.log(currentConversation.messages.filter(sender => e.senderName === isLoggedIn.name))
    //     let filtered = currentConversation.messages.filter(msg => msg.senderName === isLoggedIn.name)
    //     console.log(filtered)
    //     // let filteredMessages = currentConversation.messages.filter(e)
    //     filtered.forEach(msg => {
    //         if (msg.senderName === isLoggedIn.name) {
    //             console.log(isLoggedIn)
    //         }
    //     })
    // }

    async function handleEdit(sender, index) {
        setDeleteIndex(index)

        if (sender === isLoggedIn.name) {
            setEditMessage(!editMessage);
            setCurrentlyEditing(!currentlyEditing);
            console.log(clickedUser)
            let channelMSGS = await fetchOrCreateConversation(isLoggedIn.uuid, currentReciever._id, isLoggedIn.token)
            console.log('channelMSGS: ', channelMSGS.messages)
        }
    }

    async function editUserMessage(e) {
        e.preventDefault()
        setCurrentlyEditing(!currentlyEditing)
        console.log("editmessage");
        
        console.log(editMessageInput.current.value)

        let msgObj = {
            msgBody: editInputValue,
            senderId: isLoggedIn.uuid,
            senderName: isLoggedIn.name,
            recieverId: currentReciever._id,
            recieverName: currentReciever.name,
            conversationId: currentConversation._id,
            token: isLoggedIn.token
        };
        // console.log(msgObj)
        await putEditMessage(msgObj)
        // await fetchOrCreateConversation(isLoggedIn.uuid, currentReciever._id, isLoggedIn.token)


        // let check = (await fetchOrCreateConversation(isLoggedIn.uuid, currentReciever._id, isLoggedIn.token))
        // setCurrentConversation(check)
        // setCurrentConversation((prevConversation) => {
        //     const updatedMessages = [...prevConversation.messages, msgObj];
        //     return { ...prevConversation, messages: updatedMessages };
        // });
    }


    async function deleteUserMessage(e) {
        e.preventDefault()
        setCurrentlyEditing(!currentlyEditing)

        console.log(deleteIndex)
        
        try {
            // const messageId = currentConversation.messages[deleteIndex]._id
            await deleteMsg(deleteIndex, currentConversation._id, isLoggedIn.token)
            
            const updatedMessages = currentConversation.messages.filter(
                (message, i) => i !== deleteIndex)

            setCurrentConversation((prevConversation) => ({
            ...prevConversation,
            messages: updatedMessages,
            }))
        } catch (error) {
            
        }
    }

    function handleInputClick(e) {
        // e.stopPropagation()
    }

    function handleChange() {
        console.log(editMessageInput.current.value)
        setEditInputValue(editMessageInput.current.value)
    }

    return (
        <div className="Messages">
            <div className="channel-title">
                <h2> Direktmeddelande mellan: </h2>
                <h1> {isLoggedIn.name} </h1>
                <h2> & </h2>
                <h1> {currentReciever.name} </h1>
            </div>
            <div>
                
            </div>
            {currentConversation &&
                currentConversation.messages.map((message, index) => (
                    <div
                        key={index}
                        onClick={(e) => {
                            handleEdit(message.senderName, index)
                            setClickedUser(message)
                        }}
                    >
                        <div className="message">
                            <h4> {message.senderName}:</h4>
                            <p>{message.msgBody}</p>
                        </div>
                        <p id="sent-at">{message.sentAt}</p>
                    </div>
                ))}
                <div>
                {currentlyEditing &&
                    clickedUser.senderName ===
                        isLoggedIn.name && (
                            <div className="edit-field">
                            <form id="edit-form">
                            <input
                                type="text"
                                placeholder={clickedUser.msgBody}
                                ref={editMessageInput}
                                onChange={handleChange}
                            />
                            <button onClick={editUserMessage}> Spara ändring </button>
                            <button onClick={(e) => deleteUserMessage(e)}> Radera </button>
                            </form>
                            </div>
                    )}               
                </div>

            {isLoggedIn && (
                <form>
                    <input type="text" ref={messageInput} />
                    <button onClick={handleClick}> Skicka </button>
                </form>
            )}
        </div>
    );
}
