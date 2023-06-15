import { getAllChannels } from "../../utils/AJAX/channels/getAllChannels.js";
import "./MainContent.css";
import { useEffect } from "react";
import { channelsState } from "../../recoil/atoms/channelsState.js";
import { chosenChannel } from "../../recoil/atoms/chosenChannel.js";
import { useRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { loginState } from "../../recoil/atoms/loginState.js";
import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { getAllUsers } from "../../utils/AJAX/users/getAllUsers.js";
import { usersListState } from "../../recoil/atoms/usersState.js";
import { privateChannelsState } from "../../recoil/atoms/privateChannelsState.js";
import { getPrivateChannels } from "../../utils/AJAX/privateChannels/getPrivateChannels.js";

export function MainContent() {
    const [channels, setChannels] = useRecoilState(channelsState);
    const [privateChannels, setPrivateChannels] =
        useRecoilState(privateChannelsState);
    const [activeChannel, setActiveChannel] = useRecoilState(chosenChannel);
    const [channel, setChannel] = useState(null);
    const [users, setUsers] = useRecoilState(usersListState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    async function fetchChannels() {
        try {
            let fetchedChannels = await getAllChannels();
            setChannels(fetchedChannels);
            // console.log(channels);
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPrivateChannels(token) {
        // console.log("fetchPrivateChannels: token: ", await token);
        // let testCookie = document.cookie.split('=')[1]
        // if (testCookie === '' || testCookie === undefined || testCookie === null) {
        //     return
        // }
        try {
            let fetchedPrivateChannels = await getPrivateChannels(
                isLoggedIn.token
            );
            setPrivateChannels(await fetchedPrivateChannels);
        } catch (error) {}
    }

    useEffect(() => {
        if (isLoggedIn.token) {
            fetchPrivateChannels(isLoggedIn.token);
        }
    }, [isLoggedIn.token]);

    useEffect(() => {
        fetchChannels();
    }, []);

    async function fetchUsers() {
        try {
            let fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
            // console.log(users);
        } catch (error) {}
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="MainContent">
            <Sidebar />
            <Outlet />
        </div>
    );
}
