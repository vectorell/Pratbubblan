export async function loginUser(username, password) {

    try {
        const baseUrl = '/api/auth/login'
    
        const loginAttempt = {
            name: username,
            password: password
        }
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginAttempt)
        }
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        // console.log(parsedData)

        return parsedData
        
    } catch (error) {
        console.log(error)
        return
    }
}

// loginUser(username, password)