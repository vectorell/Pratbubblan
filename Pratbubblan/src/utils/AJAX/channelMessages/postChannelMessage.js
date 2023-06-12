export async function postChannelMessage(obj) {

    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        msgId: obj.msgId,
    }

    try {
        const baseUrl = 'http://localhost:1341/api/auth/channelmessages'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "authorization": obj.token},
            body: JSON.stringify(msgData)
        }
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        console.log(parsedData)

        return
        
    } catch (error) {
        console.log(error)
        return
    }
}