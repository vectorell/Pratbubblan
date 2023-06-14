export async function getSpecificUser(id) {
    const baseUrl = `/api/users/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    
    const sendBackUser = {
        conversationIds: parsedResponse.conversationIds,
        date: parsedResponse.date,
        mail: parsedResponse.mail,
        messages: parsedResponse.messages,
        name: parsedResponse.name,
        _id: parsedResponse._id,
    }
    return sendBackUser
}