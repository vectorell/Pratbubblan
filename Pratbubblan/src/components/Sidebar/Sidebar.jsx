import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import { channelsState } from "../../recoil/atoms/channelsState"
import { chosenChannel } from "../../recoil/atoms/chosenChannel"
import { loginState } from "../../recoil/atoms/loginState"
import { Channel } from "../../routes/Channel"
import { NavLink } from "react-router-dom"
import { ChannelList } from "./ChannelList/ChannelList"
import './Sidebar.css'
import { DmList } from "./DmList/DmList"

export function Sidebar() {
    const [channels, setChannels] = useRecoilState(channelsState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)


    return (
    <>
        <div className="Sidebar">

            <ChannelList />
            <DmList />
                    
        </div>

    </>

    )
}