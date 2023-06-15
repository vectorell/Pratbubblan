export async function postDmMessage(obj) {

    // console.log('postDmMessage: obj: ', obj)
    
    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        recieverName: obj.recieverId,
        msgId: obj.msgId,
        conversationId: obj.conversationId
    }
    // console.log('postDmMessage: msgData: ', msgData)

    try {
        const baseUrl = '/api/auth/messages'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "authorization": obj.token},
            body: JSON.stringify(msgData)
        }
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        // console.log(parsedData)

        return
        
    } catch (error) {
        console.log(error)
        return
    }
}