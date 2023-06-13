export async function getPrivateChannels(token) {
    const baseUrl = "http://localhost:1341/api/channels/private"

    console.log('token in ajax: ',token)

    let options = {
        method: 'GET',
        headers: {"Content-Type": "application/json", "authorization": token}
    }

    let response = await fetch (baseUrl, options)
    let parsedResponse = await response.json()
    console.log(parsedResponse)
    return parsedResponse
}