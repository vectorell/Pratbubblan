export async function putEditChannelMessage(obj) {
    console.log('inuti putEditChannelMessage')
    // maybeMsg, ska vara ett objekt
    // maybeMsg.msgBody ska vara en sträng
    // maybeMsg.senderId, ska vara en sträng
    // maybeMsg.recieverId, ska vara en sträng ()
    // maybeMsg.senderName, ska vara en sträng
    // maybeMsg.recieverName, ska vara en sträng
    // maybeMsg.channelId, ska vara en sträng

    const baseUrl = `/api/channels/${obj.channelId}/${obj.userIndex}`

    
    let maybeMsg = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        token: obj.token,
        sentAt: new Date(),
        msgId: obj.msgId
    }
    // console.log('userIndex i ajax: ', obj.userIndex)

    let options = {
        method: 'PUT',
        headers: {"Content-Type": "application/json", "authorization": obj.token},
        body: JSON.stringify(maybeMsg)
    }

    try {
        let response = await fetch ( baseUrl, options)
        // let parsedResponse = await response.json()
        // console.log(parsedResponse)
        console.log(response)
    } catch (error) {
        // console.log(error)
    }
}