export async function deleteMsg(msgIndex, conversationId, token) {
    // console.log('deleteMsg: msgIndex: ', msgIndex)
    // console.log('deleteMsg: conversationId: ', conversationId)

    const data = {
        conversationId: conversationId
    }

    const baseUrl = `/api/messages/${msgIndex}`

    let options = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "authorization": token},
        body: JSON.stringify(data)
    }

    let response = await fetch(baseUrl, options)
}