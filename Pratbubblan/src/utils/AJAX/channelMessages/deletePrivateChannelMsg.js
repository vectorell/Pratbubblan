export async function deletePrivateChannelMsg(msgIndex, channelId, token) {
    console.log('deleteChannelMsg: msgIndex: ', msgIndex)
    console.log('deleteChannelMsg: channelId: ', channelId)

    const data = {
        channelId: channelId
    }

    const baseUrl = `/api/channels/private/${msgIndex}`

    let options = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "authorization": token},
        body: JSON.stringify(data)
    }

    let response = await fetch(baseUrl, options)
}