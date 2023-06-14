export async function postNewUser(obj) {

    console.log('postNewUser(obj): ', obj)

    let msgData = {
        name: obj.name,
        mail: obj.mail,
        password: obj.password,
        token: obj.token
    }

    try {
        const baseUrl = '/api/auth/user'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "authorization": obj.token},
            body: JSON.stringify(msgData)
        }
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        console.log('parsedData: ', parsedData)

        return true
        
    } catch (error) {
        console.log('error', error)
        return
    }
}