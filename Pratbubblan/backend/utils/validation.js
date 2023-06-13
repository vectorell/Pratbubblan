
// Ny användare
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

    if (typeof (maybeUser.password) !== "string") {
        return false
    } 
    
    if (maybeUser.password === '') {
        return false
    }

    if (typeof (maybeUser.token) !== "string") {
        return false
    } 
    
    if (maybeUser.token === '') {
        return false
    }
    
    // Om maybeUser innehåller några andra keys än 'name', 'password' eller 'mail'
    const maybeUserKeys = Object.keys(maybeUser)
    // console.log(maybeUserKeys)
    const extraFields = maybeUserKeys.filter(key => (key !== 'name') && (key !== 'mail') && (key !== 'password') && (key !== 'token'))
    
    if (extraFields.length > 0) {
        return false
    }

    return true
}

// Ändra på användare
export function validateUserBodyPUT(maybeUser) {

    if (!maybeUser) {
        console.log(`POST /api/users ${!maybeUser}`)
        return false
    }
    
    
    if (typeof maybeUser !== 'object') {
        console.log(`POST /api/users ${!maybeUser}`)
        return false
    }
    
    if (typeof (maybeUser.name) !== "string") {
        console.log('Inuti validateUserBodyPUT: name !== "string"')
        return false
    }
    
    if (maybeUser.name === '') {
        console.log('Inuti validateUserBodyPUT: name === ""')
        return false
    }
    
    
    if (typeof (maybeUser.mail) !== "string") {
        console.log('Inuti validateUserBodyPUT: mail !== "string"')
        return false
    } 
    
    if (maybeUser.mail === '') {
        console.log('Inuti validateUserBodyPUT: mail === ""')
        return false
    }
    
    // if (typeof (maybeUser.uuid) !== "string") {
        //     return false
        // } 
        
        // if (maybeUser.uuid === '') {
            //     return false
            // }
            
            // Om maybeUser innehåller några andra keys än 'name', 'password' eller 'mail'
            const maybeUserKeys = Object.keys(maybeUser)
            // console.log(maybeUserKeys)
            const extraFields = maybeUserKeys.filter(key => (key !== 'name') && (key !== 'mail'))
            
            if (extraFields.length > 0) {
                console.log('Inuti validateUserBodyPUT: extraFields.ength > 0')
                return false
            }
            
            return true
}


export function validateChannel(maybeChannel) {
    if (!maybeChannel) {
        console.log(`POST /api/auth/channels ${!maybeChannel}`)
        return false
    }
    
    
    if (typeof maybeChannel !== 'object') {
        console.log(`/api/auth/channels ${!maybeChannel}`)
        return false
    }
    
    if (typeof (maybeChannel.channelName) !== "string") {
        console.log('1')
        return false
    }
    
    if (maybeChannel.channelName === '') {
        console.log('2')
        return false
    }
    
    
    if (maybeChannel.isLocked === undefined || maybeChannel.isLocked === null ) {
        console.log('3')
        return false
    } 
    
    // Om maybeChannel innehåller några andra keys än 'name', 'password' eller 'mail'
    const maybeChannelKeys = Object.keys(maybeChannel)
    // console.log(maybeChannelKeys)
    const extraFields = maybeChannelKeys.filter(key => (key !== 'channelName') && (key !== 'isLocked'))
    
    if (extraFields.length > 0) {
        console.log('4')
        return false
    }

    return true
}


export function validateDmMsg(maybeMsg) {

    if (!maybeMsg) {
        console.log("!maybeMsg")
        console.log(`POST /api/messages ${!maybeMsg}`)
        return false
    }
    
    
    if (typeof maybeMsg !== 'object') {
        console.log("maybeMsg !== 'object'")
        console.log(`POST /api/messages ${!maybeMsg}`)
        return false
    }
    
    if (typeof (maybeMsg.msgBody) !== "string") {
        console.log('msgBody !== string')
        return false
    }
    
    if (maybeMsg.msgBody === '') {
        console.log("msgBody === ''")
        return false
    }
    
    if (typeof (maybeMsg.senderId) !== "string") {
        console.log('senderId !== "string"')
        return false
    } 
    
    if (maybeMsg.senderId === '') {
        console.log("senderId === ''")
        return false
    }

    if (typeof (maybeMsg.recieverId) !== "string") {
        console.log('recieverId !== "string"')
        return false
    } 
    
    if (maybeMsg.recieverId === '') {
        console.log("recieverId === ''")
        return false
    }

    if (typeof (maybeMsg.senderName) !== "string") {
        console.log('senderId !== "string"')
        return false
    } 
    
    if (maybeMsg.senderName === '') {
        console.log("senderId === ''")
        return false
    }

    if (typeof (maybeMsg.recieverName) !== "string") {
        console.log('recieverId !== "string"')
        return false
    } 
    
    if (maybeMsg.recieverName === '') {
        console.log("recieverId === ''")
        return false
    }

    if (typeof (maybeMsg.conversationId) !== "string") {
        console.log('conversationId !== "string"')
        return false
    } 
    
    if (maybeMsg.conversationId === '') {
        console.log("conversationId === ''")
        return false
    }
    
    // Om maybeMsg innehåller några andra keys än spec
    const maybeMsgKeys = Object.keys(maybeMsg)
    // console.log(maybeMsgKeys)
    const extraFields = maybeMsgKeys.filter(key => (key !== 'senderId') && (key !== 'recieverId') && (key !== 'msgBody') && (key !== 'sentAt') && (key !== 'senderName') && (key !== 'recieverName') && (key !== 'conversationId'))
    
    if (extraFields.length > 0) {
        return false
    }
    console.log('Validation success!')
    return true
}


export function validateChannelMsg(maybeChannelMessage) {

    if (!maybeChannelMessage) {
        console.log("!maybeChannelMessage")
        console.log(`POST /api/messages ${!maybeChannelMessage}`)
        return false
    }
    
    
    if (typeof maybeChannelMessage !== 'object') {
        console.log("maybeChannelMessage !== 'object'")
        console.log(`POST /api/messages ${!maybeChannelMessage}`)
        return false
    }
    
    if (typeof (maybeChannelMessage.msgBody) !== "string") {
        console.log('msgBody !== string')
        return false
    }
    
    if (maybeChannelMessage.msgBody === '') {
        console.log("msgBody === ''")
        return false
    }
    
    if (typeof (maybeChannelMessage.senderId) !== "string") {
        console.log('senderId !== "string"')
        return false
    } 
    
    if (maybeChannelMessage.senderId === '') {
        console.log("senderId === ''")
        return false
    }

    if (typeof (maybeChannelMessage.senderName) !== "string") {
        console.log('senderId !== "string"')
        return false
    } 
    
    if (maybeChannelMessage.senderName === '') {
        console.log("senderId === ''")
        return false
    }

    if (typeof (maybeChannelMessage.recieverId) !== "string") {
        console.log('recieverId !== "string"')
        return false
    } 
    
    if (maybeChannelMessage.recieverId === '') {
        console.log("recieverId === ''")
        return false
    }
    
    // Om maybeChannelMessage innehåller några andra keys än spec
    const maybeChannelMessageKeys = Object.keys(maybeChannelMessage)
    // console.log(maybeChannelMessageKeys)
    const extraFields = maybeChannelMessageKeys.filter(key => (key !== 'senderId') && (key !== 'senderName') && (key !== 'recieverId') && (key !== 'msgBody') && (key !== 'sentAt'))
    
    if (extraFields.length > 0) {
        return false
    }

    return true
}