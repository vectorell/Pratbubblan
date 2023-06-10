import { useRecoilState } from "recoil"
import { channelsState } from "../../../recoil/atoms/channelsState"
import { loginState } from "../../../recoil/atoms/loginState"
import { NavLink } from "react-router-dom"
import './ChannelList.css'
import { getSpecificChannel } from "../../../utils/AJAX/channels/getSpecificChannel"
import { chosenChannel } from "../../../recoil/atoms/chosenChannel"

export function ChannelList() {
    const [channels, setChannels] = useRecoilState(channelsState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)

    async function handleClick(id) {
        // const updatedChannel = await getSpecificChannel(id)
        // setActiveChannel(await updatedChannel)

        // console.log(channels[0].messages)
        // console.log(activeChannel._id)

        // let foundChannel = channels.find(channel => channel._id === activeChannel._id)

        

        // console.log('foundChannel: ', foundChannel)
        // console.log(foundChannel.messages)
    }

    return (
        <div className="ChannelList">
                <h3>  KANALER  </h3>
                {channels ? channels.map((channel, index) => (
                    channel.isLocked ? 
                    <NavLink
                        className={!isLoggedIn ? 'disabled' : ''}
                        onClick={() => handleClick(channel._id)}
                        disabled={!isLoggedIn}
                        to={`/${channel._id}`} 
                        key={index}>
                            {isLoggedIn ? <p>{channel.channelName} (unlocked)</p>
                            : <p>{channel.channelName} (locked)</p>
                            }
                            
                        
                    </NavLink> 
                    :
                    <NavLink 
                        to={`/${channel._id}`} 
                        key={index}
                        onClick={() => handleClick(channel._id)}
                        >
                        <p>{channel.channelName}</p>
                    </NavLink>

                )):null}
        </div>
    )
}

