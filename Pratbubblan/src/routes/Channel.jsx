import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { getSpecificChannel } from "../utils/AJAX/channels/getSpecificChannel"
import { chosenChannel } from "../recoil/atoms/chosenChannel"
import { useRecoilState } from "recoil"
import { channelsState } from "../recoil/atoms/channelsState"
import { usersListState } from "../recoil/atoms/usersState"
import './Channel.css'
import { postChannelMessage } from "../utils/AJAX/channelMessages/postChannelMessage"
import { loggedInUser } from "../recoil/atoms/loggedInUser"
import { getSpecificUser } from "../utils/AJAX/users/getSpecificUser"
import { getAllChannels } from "../utils/AJAX/channels/getAllChannels"
// import { randomUUID } from "crypto"
import { loginState } from "../recoil/atoms/loginState"
import { privateChannelsState } from "../recoil/atoms/privateChannelsState"

export function Channel() {
    const {channelId} = useParams()
    const [channels, setChannels] = useRecoilState(channelsState)
    const [privateChannels, setPrivateChannels] = useRecoilState(privateChannelsState)

    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)
    // const [channel, setChannel] = useState(null)
    const [users, setUsers] = useRecoilState(usersListState)
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
    const [messages, setMessages] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)

    const messageInput = useRef(null)


    function findChannel(id) {
        let foundChannel = channels.find(channel => channel._id === id)
        // console.log('foundChannel: ',foundChannel);
        
        if (foundChannel === undefined) {
            let foundPrivateChannel = privateChannels.find(channel => channel._id === id)
            setActiveChannel(foundPrivateChannel)
            return
        }


        setActiveChannel(foundChannel)
        return foundChannel
    }

    useEffect(() => {
        findChannel(channelId)
    }, [channelId])

    function convertSenderIdToUsername(senderId) {
        if(!senderId) {
            return
        }

        let foundUser = users.find(user => user._id === senderId)
        return foundUser.name
    }

    function convertRecieverIdToUsername(recieverId) {
        if(!recieverId) {
            return
        }
        let foundUser = users.find(user => user._id === recieverId)
        return foundUser.name
    }

    // let msgObject
    async function handleSend(e) {
        e.preventDefault()

        function containsOnlySpaces(string) {
            return /^\s*$/.test(string)
        }

        if (containsOnlySpaces(messageInput.current.value)) {
            return
        }

        if (messageInput.current.value === '') {
            return
        }

        //TODO
        let sender = await getSpecificUser(isLoggedIn.uuid)

        let msgObject = {
            msgBody: messageInput.current.value,
            senderId: sender._id,
            senderName: isLoggedIn.name,
            recieverId: channelId,
            token: isLoggedIn.token,
        }

        console.log('Channel.jsx: handleSend: msgObject: ', msgObject)

        await postChannelMessage(msgObject)
        messageInput.current.value = ''

        let fetchedChannels = await getAllChannels()
        setChannels(await fetchedChannels)

        setActiveChannel((prevChannel) => {
            const updatedMessages = [...prevChannel.messages, msgObject];
            return { ...prevChannel, messages: updatedMessages }
        })
    }



    

    return (
        <div className="Channel">
            <div className="channel-title">
                <h2> Kanal: </h2>  
                <h1>{activeChannel && activeChannel.channelName} </h1>
            </div>

            {
                activeChannel &&
                activeChannel.messages.map((message, index) => (
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
                <button onClick={handleSend}> Skicka </button>
            </form>
            }
            {!isLoggedIn &&
                <h3 className='please-login-msg'>Var god logga in för att skriva till kanalen...</h3>
            }
        </div>
    )
}