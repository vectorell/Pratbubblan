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

    function handleClick(privateChannel) {
        // console.log(privateChannel)
        setActiveChannel(privateChannel)
    }
    return (
        <div className="PrivateChannelList">
            <h3> Privata kanaler </h3>
            {privateChannels.length > 0 ? privateChannels.map((privateChannel, index) => (
                    <NavLink 
                        to={`/private/${privateChannel._id}`} 
                        key={index}
                        onClick={() => handleClick(privateChannel)}
                        >
                        <p>{privateChannel.channelName}</p>
                    </NavLink>

                )): <p> Var god logga in för denna vy</p>}
        </div>
    )
}