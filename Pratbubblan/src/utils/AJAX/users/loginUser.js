let username = 'pelle1337'
let password = 'pelle1337'


export async function loginUser(username, password) {

    try {
        const baseUrl = 'http://localhost:1341/api/auth/login'
    
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
        console.log(parsedData)

        return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}

// loginUser(username, password)