import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { chosenChannel } from "../recoil/atoms/chosenChannel";
import { useRecoilState } from "recoil";
import { channelsState } from "../recoil/atoms/channelsState";
import "./Channel.css";
import { postChannelMessage } from "../utils/AJAX/channelMessages/postChannelMessage";
import { getSpecificUser } from "../utils/AJAX/users/getSpecificUser";
import { getAllChannels } from "../utils/AJAX/channels/getAllChannels";
import { loginState } from "../recoil/atoms/loginState";
import { privateChannelsState } from "../recoil/atoms/privateChannelsState";
import { putEditChannelMessage } from "../utils/AJAX/channelMessages/putEditChannelMessage";
import { deleteChannelMsg } from "../utils/AJAX/channelMessages/deleteChannelMsg";

export function Channel() {
    const { channelId } = useParams();
    const [channels, setChannels] = useRecoilState(channelsState);
    const [privateChannels, setPrivateChannels] =
        useRecoilState(privateChannelsState);

    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [currentlyEditing, setCurrentlyEditing] = useState(false);
    const [clickedUser, setClickedUser] = useState("");
    const [userIndex, setUserIndex] = useState(0);
    const [editMessage, setEditMessage] = useState(false);
    const [editInputValue, setEditInputValue] = useState("");

    const messageInput = useRef(null);
    const editMessageInput = useRef(null);

    function findChannel(id) {
        let foundChannel = channels.find((channel) => channel._id === id);

        if (foundChannel === undefined) {
            let foundPrivateChannel = privateChannels.find(
                (channel) => channel._id === id
            );
            setActiveChannel(foundPrivateChannel);
            return;
        }
        setActiveChannel(foundChannel);
        return foundChannel;
    }

    useEffect(() => {
        findChannel(channelId);
    }, [channelId]);

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

        // console.log("Channel.jsx: handleSend: msgObject: ", msgObject);

        await postChannelMessage(msgObject);
        messageInput.current.value = "";

        let fetchedChannels = await getAllChannels();
        setChannels(await fetchedChannels);

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

            await putEditChannelMessage(msgObj);
            let updatedChannels = await getAllChannels();
            setChannels(updatedChannels);

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

        try {
            await deleteChannelMsg(
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

            let updatedChannels = await getAllChannels(isLoggedIn.token);
            setChannels(updatedChannels);
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange() {
        setEditInputValue(editMessageInput.current.value);
        // console.log(activeChannel._id);
        // console.log(clickedUser);
    }

    return (
        <div className="Channel">
            <div className="channel-title">
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
                        <p className="sent-at">{message.sentAt}</p>
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
                    {(isLoggedIn && !currentlyEditing) && <p className="edit-msg"> Klicka på en av dina meddelanden för att ändra eller radera </p>}
            </div>

            {isLoggedIn && (
                <form>
                    <input type="text" ref={messageInput} />
                    <button onClick={handleSend}> Skicka </button>
                </form>
            )}
            {!isLoggedIn && (
                <h3 className="please-login-msg">
                    Var god logga in för att skriva till kanalen...
                </h3>
            )}
        </div>
    );
}
