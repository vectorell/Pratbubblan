
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
    
    // Om maybeUser innehåller några andra keys än 'name', 'password' eller 'mail'
    const maybeUserKeys = Object.keys(maybeUser)
    // console.log(maybeUserKeys)
    const extraFields = maybeUserKeys.filter(key => (key !== 'name') && (key !== 'mail') && (key !== 'password'))
    
    if (extraFields.length > 0) {
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
        return false
    }
    
    if (maybeChannel.channelName === '') {
        return false
    }
    
    
    if (maybeChannel.isLocked === undefined || maybeChannel.isLocked === null ) {
        return false
    } 
    
    // Om maybeChannel innehåller några andra keys än 'name', 'password' eller 'mail'
    const maybeChannelKeys = Object.keys(maybeChannel)
    // console.log(maybeChannelKeys)
    const extraFields = maybeChannelKeys.filter(key => (key !== 'channelName') && (key !== 'isLocked'))
    
    if (extraFields.length > 0) {
        return false
    }

    return true
}


export function validateMsg(maybeMsg) {

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

    if (typeof (maybeMsg.belongsTo) !== "string") {
        console.log('belongsTo !== "string"')
        return false
    } 
    
    if (maybeMsg.belongsTo === '') {
        console.log("belongsTo === ''")
        return false
    }
    
    // Om maybeMsg innehåller några andra keys än spec
    const maybeMsgKeys = Object.keys(maybeMsg)
    // console.log(maybeMsgKeys)
    const extraFields = maybeMsgKeys.filter(key => (key !== 'senderId') && (key !== 'recieverId') && (key !== 'msgBody') && (key !== 'belongsTo') && (key !== 'sentAt'))
    
    if (extraFields.length > 0) {
        return false
    }

    return true
}