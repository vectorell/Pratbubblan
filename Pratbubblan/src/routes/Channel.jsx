import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSpecificChannel } from "../utils/AJAX/channels/getSpecificChannel"

export function Channel() {
    const {id} = useParams()
    const [channel, setChannel] = useState(null)

    async function fetchChannel() {
        try {
            let fetchedChannel = await getSpecificChannel(id)
            setChannel(fetchedChannel)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchChannel()
    }, [])


    return (
        <>
            <h1> {channel && channel.channelName} </h1>

            <p>{channel && (channel.messages).toString() }</p>
        </>
    )
}