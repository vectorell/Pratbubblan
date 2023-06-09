import { getAllChannels } from '../../utils/AJAX/channels/getAllChannels.js'
import './MainContent.css'
import { useEffect } from 'react'
import { channelsState } from '../../recoil/atoms/channelsState.js'
import { chosenChannel } from '../../recoil/atoms/chosenChannel.js'
import { useRecoilState } from 'recoil'
import { NavLink, Outlet } from 'react-router-dom'
import { Channel } from '../../routes/Channel.jsx'
import { useState } from 'react'

export function MainContent() {
    const [channels, setChannels] = useRecoilState(channelsState)
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)
    const [channel, setChannel] = useState(null)

    async function fetchChannels() {
        try {
            let fetchedChannels = await getAllChannels()
            setChannels(fetchedChannels)
            console.log(channels)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchChannels()
      }, [])

    //   async function fetchChannel() {
    //     try {
    //         let fetchedChannel = await getSpecificChannel(id)
    //         setChannel(fetchedChannel)
    //     } catch (error) {
    //     }
    // }

    // useEffect(() => {
    //     fetchChannel()
    // }, [])

    return (
        <div className="MainContent">
        
            <div>
                <p> KANALER </p>
                {channels ? channels.map((channel, index) => (

                    <NavLink to={`/channels/${channel._id}`} onClick={() => fetchChannel(id)} key={index}>
                    {channel.channelName}</NavLink>

                )):null}
            </div>

            <div>
            <Channel />
                {/* <h1>{activeChannel}</h1> */}
            </div>
        
        </div>
    )
}