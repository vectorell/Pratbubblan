export async function putEditMessage(obj) {
    // maybeMsg, ska vara ett objekt
    // maybeMsg.msgBody ska vara en sträng
    // maybeMsg.senderId, ska vara en sträng
    // maybeMsg.recieverId, ska vara en sträng ()
    // maybeMsg.senderName, ska vara en sträng
    // maybeMsg.recieverName, ska vara en sträng
    // maybeMsg.conversationId, ska vara en sträng

    const baseUrl = `/api/messages`

    let maybeMsg = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        recieverName: obj.recieverName,
        conversationId: obj.conversationId
    }

    let options = {
        method: 'PUT',
        headers: {"Content-Type": "application/json", "authorization": obj.token},
        body: JSON.stringify(body)
    }

    try {
        let response = await fetch ( baseUrl, options)
        // let parsedResponse = await response.json()
        // console.log(parsedResponse)
        console.log(response)
    } catch (error) {
        // console.log(error)
    }




    // console.log(body);
    console.log('Sparaknapp tryckt!')

}