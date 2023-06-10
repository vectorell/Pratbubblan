import { getAllChannels } from '../../utils/AJAX/channels/getAllChannels.js'
import './MainContent.css'
import { useEffect } from 'react'
import { channelsState } from '../../recoil/atoms/channelsState.js'
import { chosenChannel } from '../../recoil/atoms/chosenChannel.js'
import { useRecoilState } from 'recoil'
import { NavLink, Outlet } from 'react-router-dom'
import { Channel } from '../../routes/Channel.jsx'
import { useState } from 'react'
import { loginState } from '../../recoil/atoms/loginState.js'
import { Sidebar } from '../Sidebar/Sidebar.jsx'
import { MessageField } from '../MessageField/MessageField.jsx'
import { getAllUsers } from '../../utils/AJAX/users/getAllUsers.js'
import { usersListState } from '../../recoil/atoms/usersState.js'

export function MainContent() {
    const [channels, setChannels] = useRecoilState(channelsState)
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel)
    const [channel, setChannel] = useState(null)

    const [users, setUsers] = useRecoilState(usersListState)

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState)

    

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

    async function fetchUsers() {
        try {
            let fetchedUsers = await getAllUsers()
            setUsers(fetchedUsers)
            console.log(users)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="MainContent">
            <Sidebar />
            <MessageField />
        </div>
    )
}