## [GET] - Hämta alla användare
Exempelfunktion:
```js
async function getAllUsers() {
    const baseUrl = "http://.../api/users"

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    return parsedResponse
}
```
## [GET] - Hämta specifik användare
```js
async function getSpecificUser(id) {
    const baseUrl = `http://.../api/users/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    
    return parsedResponse
}
```

## [POST] - Logga in användare
APIet förväntar sig:
```json
{
    "name": "string",
    "password": "string",
}
```
Exempelfunktion:
```js
async function loginUser(username, password) {

    try {
        const baseUrl = 'http://.../api/auth/login'
    
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

        return parsedData
    } catch (error) {
        console.log(error)
        return
    }
}
```

## [POST] - Lägga till användare
APIet förväntar sig:
    
```json
{
    "name": "user5",
    "mail": "user5@example.com",
    "password": "password5"
}
```
och funktionen ser ut så här:
```js
TODO
```

## [PUT] - Ändra på en användare
```js
TODO
```

## [DELETE] - Radera användare
```js
TODO
```

## [GET] - Hämta alla kanaler
```js
async function getAllChannels() {
    const baseUrl = "http://..../api/auth/channels"

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    return parsedResponse
}
```
## [GET] - Hämta specifik kanal
```js
async function getSpecificChannel(id) {
    const baseUrl = `http://.../api/auth/channels/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    return parsedResponse
}
```
## [POST] - Skicka meddelande till kanal
APIet förväntar sig följande:
```json
{
    "msgBody": "string",
    "senderId": "string", // 24 tecken
    "recieverId": "string", // 24 tecken
    "msgId": "string"
}
```
```js
async function postChannelMessage(obj) {

    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        recieverId: obj.recieverId,
        msgId: obj.msgId
    }

    try {
        const baseUrl = 'http://.../api/auth/channelmessages'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(msgData)
        }
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        return
    } catch (error) {
        console.log(error)
        return
    }
}
```
## [] - Hämta alla konversationer
```js
TODO
```

## [] - Hämta konversation (eller skapa om saknas)
```js
TODO
```


## [GET] - Hämta alla DM
```js
TODO
```

## [GET] - Hämta specifikt DM
```js
TODO
```

## [POST] - Skicka DM
```js
TODO
``` 