export async function getSpecificChannel(id) {
    const baseUrl = `/api/auth/channels/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    console.log(parsedResponse)
    return parsedResponse
}