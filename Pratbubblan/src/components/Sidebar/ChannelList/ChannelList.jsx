import { useRecoilState } from "recoil"
import { channelsState } from "../../../recoil/atoms/channelsState"
import { loginState } from "../../../recoil/atoms/loginState"
import { NavLink } from "react-router-dom"
import './ChannelList.css'
import { chosenChannel } from "../../../recoil/atoms/chosenChannel"

export function ChannelList() {
    const [channels, setChannels] = useRecoilState(channelsState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)

    return (
        <div className="ChannelList">
                <h3>  KANALER  </h3>
                {channels ? channels.map((channel, index) => (
                    <NavLink 
                        to={`/${channel._id}`} 
                        key={index}>
                        <p>{channel.channelName}</p>
                    </NavLink>

                )):null}
        </div>
    )
}

