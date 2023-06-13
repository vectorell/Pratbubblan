export async function fetchOrCreateConversation(currentUser, recieverUser, token) {

    console.log('currentUser: ', currentUser)
    console.log('recieverUser: ', recieverUser)

    const baseUrl = `http://localhost:1341/api/auth/conversation/${currentUser}/${recieverUser}`

    const options = {
        method: 'GET',
        headers: {"Content-Type": "application/json", "authorization": token}
    }

    let response = await fetch(baseUrl, options)
    let parsedResponse = await response.json()
    console.log(parsedResponse)

    return parsedResponse
}