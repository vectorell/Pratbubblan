export async function getAllChannels() {
    const baseUrl = "http://localhost:1341/api/auth/channels"

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    console.log(parsedResponse)
    return parsedResponse
}