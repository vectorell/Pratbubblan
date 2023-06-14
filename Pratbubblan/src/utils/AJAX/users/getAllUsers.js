export async function getAllUsers() {
    const baseUrl = "/api/users"

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    console.log(parsedResponse)
    return parsedResponse
}