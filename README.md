# Pratbubblan - ett skolprojekt i backend

Detta projekt skapades med hjälp av MERN-stacken, dvs. **MongoDB Atlas**, **Express**, **React** och **Node.js**.

---
## Datamodellering:

### #1. User
| Egenskap         | Datatyp     | Beskrivning                                       |
|------------------|-------------|---------------------------------------------------|
| name             | String      | *användarnamn*                                    |
| mail             | String      | *emailadress*                                     |
| password         | String      | *lösenord*                                        |
| conversationIds  | array       | lista med konversationer som användaren deltar i  |
| messages         | array       | *lista med meddelanden som användaren har skickat*|

### #2. DM Messages
| Egenskap         | Datatyp     | Beskrivning                               |
|------------------|-------------|-------------------------------------------|
| senderId         | String      | *Avsändarens ID*                          |
| senderName       | String      | *Avsändarens namn*                        |
| recieverId       | String      | *Mottagarens ID*                          |
| recieverName     | String      | *Mottagarens namn*                        |
| msgBody          | String      | *själva meddelandet som skickas*          |
| sentAt           | String      | *datum och tid när meddelandet skickades* |

### #3. Conversations
| Egenskap         | Datatyp     | Beskrivning                               |
|------------------|-------------|-------------------------------------------|
| conversationId   | String      | *Konversationens ID*                      |
| participantsId   | Array       | *Deltagarnas IDn*                         |
| creationDate     | String      | *Datum för skapande av konversation*      |
| lastActiveAt     | String      | *Senaste uppdateringen av konversationen* |
| messages         | Array       | *lista med meddelanden*                   |
| isLocked         | Boolean     | *Är kanalen låst eller olåst?*            |

### #4. Channels / PrivateChannels
| Egenskap         | Datatyp     | Beskrivning                               |
|------------------|-------------|-------------------------------------------|
| channelName      | String      | *Kanalens namn*                           |
| _id              | String      | *Kanalens ID*                             |
| participantsId   | Array       | *Deltagarnas IDn*                         |
| messages         | Array       | *Lista med kanalens meddelanden*          |

### #5. Channel messages / PrivateChannels messages
| Egenskap         | Datatyp     | Beskrivning                               |
|------------------|-------------|-------------------------------------------|
| msgId            | String      | *Meddelandets ID*                         |
| senderId         | String      | *Avsändarens ID*                          |
| senderName       | String      | *Avsändarens namn*                        |
| recieverId       | String      | *Mottagarens ID, i detta fall kanalens ID*|
| msgBody          | String      | *Själva meddelandet*                      |
| sentAt           | String      | *Datum och tid när meddelandet skickades* |



## ENDPOINTS för användare

### [GET] - Hämta alla användare
API:et förväntar sig ingenting.


Exempelfunktion:
```js
async function getAllUsers() {
    const baseUrl = "/api/users"

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    return parsedResponse
}
```
### [GET] - Hämta specifik användare
API:et förväntar sig ett ***användar-ID***.
```js
async function getSpecificUser(id) {
    const baseUrl = `/api/users/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
}
```

### [POST] - Logga in användare
APIet förväntar sig följande ***body***:
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

        return parsedData
        
    } catch (error) {
        console.log(error)
        return
    }
}

// loginUser(username, password)
```

### [POST] - Lägga till användare
APIet förväntar sig ***token*** och följande ***body***:
    
```json
{
    "name": "user5",
    "mail": "user5@example.com",
    "password": "password5"
}
```
och funktionen kan se ut så här:
```js
async function postNewUser(obj) {

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
        return
    } catch (error) {
        console.log('error', error)
        return
    }
}
```

### [PUT] - Ändra på en användare
APIet förväntar sig ***användar-ID*** och följande ***body***:
    
```json
{
    "name": "exempel",              // sträng
    "mail": "exempel@example.com",  // sträng
    "token": "exempel"              // sträng
}
```
och funktion kan se ut såhär:
```js
async function putExistingUser(obj) {

    const baseUrl = `/api/auth/${obj.uuid}`

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
        let response = await fetch (baseUrl, options)
        return
    } catch (error) {
        console.log(error)
    }
}
```

### [DELETE] - Radera användare
APIet förväntar sig ***token*** samt ***användar-ID***.

Exempel på funktion:

```js
async function deleteUser(obj) {
    const baseUrl = `/api/auth/delete-user/${obj.uuid}`

    let options = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "authorization": obj.token}
    }

    document.cookie = "user_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    await fetch(baseUrl, options)
}
```


## ENDPOINTS för publika kanaler

### [GET] - Hämta alla publika kanaler
API:et förväntar sig ingenting.
```js
async function getAllChannels() {
    const baseUrl = "/api/auth/channels"

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    return parsedResponse
}
```
### [GET] - Hämta specifik publik kanal
API:et förväntar sig ett ***kanal-ID***.
```js
async function getSpecificChannel(id) {
    const baseUrl = `/api/auth/channels/${id}`

    let response = await fetch (baseUrl)
    let parsedResponse = await response.json()
    return parsedResponse
}
```
### [POST] - Skicka meddelande till publik kanal
APIet förväntar sig en ***token*** samt följande ***body***:
```json
{
    "msgBody": "string",
    "senderId": "string", // 24 tecken
    "senderName": "string"
    "recieverId": "string", // 24 tecken
    "msgId": "string"
}
```
och funktionen kan exempelvis se ut så här:
```js
export async function postChannelMessage(obj) {

    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        msgId: obj.msgId,
        token: obj.token
    }

    try {
        const baseUrl = '/api/channels/channelmessages'
    
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "authorization": obj.token},
            body: JSON.stringify(msgData)
        }

    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        return parsedData
        
    } catch (error) {
        console.log('error', error)
        return
    }
}
```

### [PUT] - Ändra meddelande i en publik kanal
API:et förväntar sig en ***token*** samt följande ***body***:
```json
{
    "msgBody": "sträng",
    "senderId": "sträng",
    "senderName": "sträng",
    "recieverId": "sträng",
    "sentAt": "sträng",
    "msgId": "sträng",
    "token": "sträng"
}
```
Exempel på funktion:
```js
async function putEditChannelMessage(obj) {

    const baseUrl = `/api/channels/${obj.channelId}/${obj.userIndex}`

    let maybeMsg = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        token: obj.token,
        sentAt: new Date(),
        msgId: obj.msgId
    }

    let options = {
        method: 'PUT',
        headers: {"Content-Type": "application/json", "authorization": obj.token},
        body: JSON.stringify(maybeMsg)
    }

    try {
        let response = await fetch ( baseUrl, options)
        return
    } catch (error) {
        console.log(error)
    }
}
```
### [DELETE] - Radera meddelande i en publik kanal
API:et förväntar sig en ***token***, ***meddelandeindex*** samt följande ***body***:
```json
{
    "channelId": "sträng"
}
```
Exempel på funktion:
```js
async function deleteChannelMsg(msgIndex, channelId, token) {

    const data = {
        channelId: channelId
    }

    const baseUrl = `/api/channels/${msgIndex}`

    let options = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "authorization": token},
        body: JSON.stringify(data)
    }

    let response = await fetch(baseUrl, options)
}
```

## ENDPOINTS för privata kanaler

### [GET] - Hämta alla privata kanaler
API:et förväntar sig en ***token***.

Exempel på funktion:
```js
async function getPrivateChannels(token) {
    const baseUrl = "/api/channels/private"

    let options = {
        method: 'GET',
        headers: {"Content-Type": "application/json", "authorization": token}
    }

    let response = await fetch (baseUrl, options)
    let parsedResponse = await response.json()
    return parsedResponse
}
```

### [POST] - Skicka meddelande till privat kanal
API:et förväntar sig följande en ***token*** samt följande ***body***:
```json
{
    "msgBody": "sträng",
    "senderId": "sträng",
    "senderName": "sträng",
    "recieverId": "sträng",
    "msgId": "sträng"
}
```
Exempelfunktion:
```js
async function postPrivateChannelMessage(obj) {

    let msgData = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        msgId: obj.msgId,
        token: obj.token
    }

    try {
        const baseUrl = '/api/channels/channelmessages/private/'
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
                "authorization": obj.token
            },
            body: JSON.stringify(msgData)
        }
    
        const response = await fetch(baseUrl, options)
        let parsedData = await response.json()
        return
    } catch (error) {
        console.log('error', error)
        return
    }
}
```

### [PUT] - Ändra meddelande i privat kanal
API:et förväntar sig en ***token***, ***kanal-ID***, ***meddelandeindex*** samt följande ***body***:
```json
{
    "msgBody": "sträng",
    "senderId": "sträng",
    "senderName": "sträng",
    "recieverId": "sträng",
    "sentAt": "sträng",
    "msgId": "sträng"
}
```
Exempelfunktion:
```js
async function putEditPrivateChannelMessage(obj) {

    const baseUrl = `/api/channels/private/${obj.channelId}/${obj.msgIndex}`

    let maybeMsg = {
        msgBody: obj.msgBody,
        senderId: obj.senderId,
        senderName: obj.senderName,
        recieverId: obj.recieverId,
        token: obj.token,
        sentAt: new Date(),
        msgId: obj.msgId
    }

    let options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json", 
            "authorization": obj.token
        },
        body: JSON.stringify(maybeMsg)
    }

    try {
        let response = await fetch ( baseUrl, options)
        return
    } catch (error) {
        console.log(error)
    }
}
```
### [DELETE] - Radera meddelande i en privat kanal
API:et förväntar sig en ***token***, ***meddelandeindex*** samt ***kanal-ID***.

Exempelfunktion:
```js
async function deletePrivateChannelMsg(msgIndex, channelId, token) {

    const data = {
        channelId: channelId
    }

    const baseUrl = `/api/channels/private/${msgIndex}`

    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json", 
            "authorization": token
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(baseUrl, options)
}
```
---
### Skapat av Victor Lindell
#### @ Folkuniversitetet Karlstad, 2023