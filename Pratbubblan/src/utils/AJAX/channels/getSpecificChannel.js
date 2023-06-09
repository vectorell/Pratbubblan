export async function getSpecificChannel(id) {
    const baseUrl = `http://localhost:1341/api/auth/channels/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    console.log(parsedResponse)
    return parsedResponse
}