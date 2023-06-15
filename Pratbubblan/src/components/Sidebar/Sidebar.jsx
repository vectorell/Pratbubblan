import { ChannelList } from "./ChannelList/ChannelList";
import "./Sidebar.css";
import { DmList } from "./DmList/DmList";
import { PrivateChannelList } from "./PrivateChannelList/PrivateChannelList.jsx";

export function Sidebar() {
    return (
        <>
            <div className="Sidebar">
                <ChannelList />
                <PrivateChannelList />
                <DmList />
            </div>
        </>
    );
}
