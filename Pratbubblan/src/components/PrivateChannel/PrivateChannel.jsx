import { useRef, useState } from "react";
import { useParams } from "react-router";
import { chosenChannel } from "../../recoil/atoms/chosenChannel";
import { useRecoilState } from "recoil";
import { privateChannelsState } from "../../recoil/atoms/privateChannelsState";
import { usersListState } from "../../recoil/atoms/usersState";
import "./PrivateChannel.css";
import { postPrivateChannelMessage } from "../../utils/AJAX/privateChannels/postPrivateChannelMessage";
import { loggedInUser } from "../../recoil/atoms/loggedInUser";
import { getSpecificUser } from "../../utils/AJAX/users/getSpecificUser";
import { loginState } from "../../recoil/atoms/loginState";
import { getPrivateChannels } from "../../utils/AJAX/privateChannels/getPrivateChannels";
import { currentRecieverState } from "../../recoil/atoms/currentReciever";
import { currentConversationState } from "../../recoil/atoms/currentConversationState";
import { putEditPrivateChannelMessage } from "../../utils/AJAX/channelMessages/putEditPrivateChannelMessage";
import { deletePrivateChannelMsg } from "../../utils/AJAX/channelMessages/deletePrivateChannelMsg";

export function PrivateChannel() {
    const { channelId } = useParams();
    const [privateChannels, setPrivateChannels] =
        useRecoilState(privateChannelsState);
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel);
    // const [channel, setChannel] = useState(null)
    const [users, setUsers] = useRecoilState(usersListState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [currentlyEditing, setCurrentlyEditing] = useState(false);
    const [clickedUser, setClickedUser] = useState("");
    const [userIndex, setUserIndex] = useState(0);
    const [editMessage, setEditMessage] = useState(false);
    const [editInputValue, setEditInputValue] = useState("");

    const messageInput = useRef(null);
    const editMessageInput = useRef(null);

    function convertRecieverIdToUsername(recieverId) {
        if (!recieverId) {
            return;
        }
        let foundUser = users.find((user) => user._id === recieverId);
        return foundUser.name;
    }

    async function handleSend(e) {
        e.preventDefault();

        function containsOnlySpaces(string) {
            return /^\s*$/.test(string);
        }

        if (containsOnlySpaces(messageInput.current.value)) {
            return;
        }

        if (messageInput.current.value === "") {
            return;
        }

        //TODO
        let sender = await getSpecificUser(isLoggedIn.uuid);

        let msgObject = {
            msgBody: messageInput.current.value,
            senderId: sender._id,
            senderName: isLoggedIn.name,
            recieverId: channelId,
            token: isLoggedIn.token,
        };

        // console.log("PrivateChannel.jsx: msgObject: ", msgObject);

        await postPrivateChannelMessage(msgObject);
        messageInput.current.value = "";

        let fetchedChannels = await getPrivateChannels(isLoggedIn.token);
        setPrivateChannels(fetchedChannels);

        setActiveChannel((prevChannel) => {
            const updatedMessages = [...prevChannel.messages, msgObject];
            return { ...prevChannel, messages: updatedMessages };
        });
    }

    async function handleEdit(sender, index) {
        setUserIndex(index);

        if (sender === isLoggedIn.name) {
            setEditMessage(!editMessage);
            setCurrentlyEditing(!currentlyEditing);
            // console.log(clickedUser);
        }
    }

    async function editUserMessage(e) {
        e.preventDefault();
        setCurrentlyEditing(!currentlyEditing);

        try {
            let msgObj = {
                msgBody: editInputValue,
                senderId: isLoggedIn.uuid,
                senderName: isLoggedIn.name,
                recieverId: activeChannel._id,
                channelId: activeChannel._id,
                token: isLoggedIn.token,
                userIndex: userIndex,
                msgId: clickedUser.msgId,
            };

            // console.log("innan await");
            await putEditPrivateChannelMessage(msgObj);
            // console.log("efter await");

            let updatedChannels = await getPrivateChannels(isLoggedIn.token);

            setPrivateChannels(updatedChannels);

            setActiveChannel((prevActiveChannel) => {
                const updatedMessages = [...prevActiveChannel.messages];

                updatedMessages[userIndex] = msgObj;

                return { ...prevActiveChannel, messages: updatedMessages };
            });
        } catch (error) {
            console.log("fel");
        }
    }

    async function deleteUserMessage(e) {
        e.preventDefault();
        setCurrentlyEditing(!currentlyEditing);

        // console.log(userIndex);

        try {
            await deletePrivateChannelMsg(
                userIndex,
                activeChannel._id,
                isLoggedIn.token
            );

            const updatedMessages = activeChannel.messages.filter(
                (message, i) => i !== userIndex
            );

            setActiveChannel((prevActiveChannel) => ({
                ...prevActiveChannel,
                messages: updatedMessages,
            }));

            let updatedChannels = await getPrivateChannels(isLoggedIn.token);
            setPrivateChannels(updatedChannels);
        } catch (error) {}
    }

    function handleChange() {
        setEditInputValue(editMessageInput.current.value);
        // console.log(activeChannel._id);
        // console.log(clickedUser);
    }

    return (
        <div className="PrivateChannel">
            <div className="PrivateChannel-title">
                <h2> Kanal: </h2>
                <h1>{activeChannel && activeChannel.channelName} </h1>
            </div>

            {activeChannel &&
                activeChannel.messages.map((message, index) => (
                    <div
                        key={index}
                        onClick={(e) => {
                            handleEdit(message.senderName, index);
                            setClickedUser(message);
                        }}
                    >
                        <div className="message">
                            <h4> {message.senderName}:</h4>
                            <p>{message.msgBody} </p>
                        </div>
                        <p id="sent-at">{message.sentAt}</p>
                    </div>
                ))}

            <div>
                {currentlyEditing &&
                    clickedUser.senderName === isLoggedIn.name && (
                        <div className="edit-field">
                            <form id="edit-form">
                                <input
                                    type="text"
                                    placeholder={clickedUser.msgBody}
                                    ref={editMessageInput}
                                    onChange={handleChange}
                                />
                                <button onClick={editUserMessage}>
                                    {" "}
                                    Spara ändring{" "}
                                </button>
                                <button onClick={(e) => deleteUserMessage(e)}>
                                    {" "}
                                    Radera{" "}
                                </button>
                            </form>
                        </div>
                    )}

                {isLoggedIn && !currentlyEditing && (
                    <p className="edit-msg">
                        {" "}
                        Klicka på en av dina meddelanden för att ändra eller
                        radera{" "}
                    </p>
                )}
            </div>

            {isLoggedIn && (
                <form>
                    <input type="text" ref={messageInput} />
                    <button onClick={handleSend}> Skicka </button>
                </form>
            )}
        </div>
    );
}
