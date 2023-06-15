export async function getAllChannels() {
    const baseUrl = "/api/auth/channels"

    let response = await fetchsenderName (baseUrl)
    let parsedResponse = await response.json()
    // console.log(parsedResponse)
    return parsedResponse
}