import { useRecoilState } from "recoil";
import { channelsState } from "../../../recoil/atoms/channelsState";
import { NavLink } from "react-router-dom";
import "./ChannelList.css";

export function ChannelList() {
    const [channels, setChannels] = useRecoilState(channelsState);

    return (
        <div className="ChannelList">
            <h3> KANALER </h3>
            {channels
                ? channels.map((channel, index) => (
                      <NavLink to={`/${channel._id}`} key={index}>
                          <p>{channel.channelName}</p>
                      </NavLink>
                  ))
                : null}
        </div>
    );
}
