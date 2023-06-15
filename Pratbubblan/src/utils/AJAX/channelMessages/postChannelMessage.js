export async function postChannelMessage(obj) {

    // console.log('postChannelMesage: obj: ', obj)

    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        msgId: obj.msgId,
        token: obj.token
    }

    try {
        const baseUrl = '/api/channels/channelmessages'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "authorization": obj.token},
            body: JSON.stringify(msgData)
        }

        // console.log('postChannelMessage: options: ', options)
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        // console.log('parsedData: ', parsedData)

        return
        
    } catch (error) {
        console.log('error', error)
        return
    }
}