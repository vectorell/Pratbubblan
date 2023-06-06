
export function validateUserBody(maybeUser) {

    if (!maybeUser) {
        console.log(`POST /api/users ${!maybeUser}`)
        return false
    }
    
    
    if (typeof maybeUser !== 'object') {
        console.log(`POST /api/users ${!maybeUser}`)
        return false
    }
    
    if (typeof (maybeUser.name) !== "string") {
        return false
    }
    
    if (maybeUser.name === '') {
        return false
    }
    
    
    if (typeof (maybeUser.mail) !== "string") {
        return false
    } 
    
    if (maybeUser.mail === '') {
        return false
    }
    
    // Om maybeUser innehåller några andra keys än 'name' eller 'mail'
    const maybeUserKeys = Object.keys(maybeUser)
    // console.log(maybeUserKeys)
    const extraFields = maybeUserKeys.filter(key => (key !== 'name') && (key !== 'mail'))
    
    if (extraFields.length > 0) {
        return false
    }

    return true
}
