import './PrivateChannelList.css'
import { useRecoilState } from 'recoil'
import { loginState } from '../../../recoil/atoms/loginState'
import { chosenChannel } from '../../../recoil/atoms/chosenChannel'
import { NavLink } from 'react-router-dom'
import { privateChannelsState } from '../../../recoil/atoms/privateChannelsState'

export function PrivateChannelList() {
    const [privateChannels, setPrivateChannels] = useRecoilState(privateChannelsState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)

    return (
        <div className="PrivateChannelList">
            <h3> Privata kanaler </h3>
            {privateChannels ? privateChannels.map((privateChannel, index) => (
                    <NavLink 
                        to={`/${privateChannel._id}`} 
                        key={index}
                        onClick={() => handleClick(privateChannel._id)}
                        >
                        <p>{privateChannel.channelName}</p>
                    </NavLink>

                )):null}
        </div>
    )
}