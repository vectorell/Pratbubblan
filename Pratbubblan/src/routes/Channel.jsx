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

export function Channel() {
    const {channelId} = useParams()
    const [channels, setChannels] = useRecoilState(channelsState)
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)
    // const [channel, setChannel] = useState(null)
    const [users, setUsers] = useRecoilState(usersListState)
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedInUser)
    const [messages, setMessages] = useState(null)

    const messageInput = useRef(null)


    function findChannel(id) {
        let foundChannel = channels.find(channel => channel._id === id)
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

        if (messageInput.current.value === '') {
            return
        }

        let sender = await getSpecificUser(userLoggedIn.uuid)

        let msgObject = {
            msgBody: messageInput.current.value,
            senderId: sender._id,
            recieverId: channelId,
        }

        await postChannelMessage(msgObject)

        let fetchedChannels = await getAllChannels()
        setChannels(await fetchedChannels)

        setActiveChannel((prevChannel) => {
            const updatedMessages = [...prevChannel.messages, msgObject];
            return { ...prevChannel, messages: updatedMessages }
        })

    }



    

    return (
        <div className="Channel">
            <div>
                <h2> Kanalen </h2>  
                <h1>{activeChannel && activeChannel.channelName} </h1>
            </div>

            {
                activeChannel &&
                activeChannel.messages.map((message, index) => (
                    <div className="message" key={index}>
                        <h4> {convertSenderIdToUsername(message.senderId)}:</h4>
                        <p>{message.msgBody}</p>
                    </div>
                ))
            }

            {userLoggedIn &&
            <form>
                <input type="text" ref={messageInput}/>
                <button onClick={handleSend}> Skicka </button>
            </form>
        }
        </div>
    )
}