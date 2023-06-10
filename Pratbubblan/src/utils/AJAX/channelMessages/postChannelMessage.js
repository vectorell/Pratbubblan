export async function postChannelMessage(obj) {

    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        recieverId: obj.recieverId,
        msgId: obj.msgId,
    }

    try {
        const baseUrl = 'http://localhost:1341/api/auth/channelmessages'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
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