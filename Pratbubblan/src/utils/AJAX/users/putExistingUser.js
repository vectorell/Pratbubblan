export async function putExistingUser(obj) {

    const baseUrl = `/api/auth/${obj.uuid}`
    /**
     * Förväntar sig:
     *  obj = {
     *      name, // sträng
     *      mail,  // sträng
     *      token, // sträng
     * }
     */

    let body = {
        name: obj.name,
        mail: obj.mail,
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