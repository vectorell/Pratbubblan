import express from 'express'
import { authenticateToken } from './authRoutes.js'
import { validateChannel } from '../utils/validation.js'
import { connectDb } from '../utils/db.js'
import PrivateChannel from '../../models/ChannelsPrivate.js'
import { validateChannelMsg } from '../utils/validation.js'
import { randomUUID } from 'crypto'
import User from '../../models/Users.js'
import Channel from '../../models/Channels.js'

const router = express.Router()
router.use( express.json() )

// [GET] - Hämta alla privata kanaler
router.get('/private', authenticateToken, async (req, res) => {
    try {
        const privateChannels = await PrivateChannel.find()
        res.send(privateChannels)
        return
    } catch (error) {
        console.log('Kunde inte hämta privata kanaler.. ', error)
        return res.sendStatus(400)
    }
})

// [PRIVATE CHANNELS - POST] - Lägg till kanal
router.post('/private', authenticateToken, async (req, res) => {
    let maybeChannel = req.body
    
    // VALIDERING
    let approved = validateChannel(maybeChannel)
    if (!approved) {
        console.log('Tillagd kanal passerar ej valideringstest. (från /channels/private)')
        res.sendStatus(400)
        return
    }
    
    // Försök skapa en ny instans av en kanal
    try {
        // Kolla om kanal redan finns
        await connectDb()
        const filteredPrivateChannels = await PrivateChannel.find({ channelName: req.body.channelName})
        if (filteredPrivateChannels.length > 0) {
            console.log('Tillagd kanal finns redan. (från /channels/private)')
            res.sendStatus(400)
            return
        }

        // Skapa en ny instans av en kanal
        maybeChannel = new PrivateChannel({
            channelName: req.body.channelName,
            isLocked: req.body.isLocked
        })

        // Spara kanalen till databasen
        await maybeChannel.save()
        
        return res.sendStatus(200)
    } catch (error) {
        console.log('Ny instans av kanal kunde inte skapas. (från /channels/private)', error)
        res.sendStatus(400)
        return
    }
})


// POST - nytt kanalmeddelande
router.post('/channelmessages', authenticateToken, async (req, res) => {
    let maybeChannelMsg = req.body

    let validChannelMessage = validateChannelMsg(maybeChannelMsg)

    if (!validChannelMessage) {
        console.log('/channelmessages: !validChannelMessage')
        return res.sendStatus(400)
    }

    validChannelMessage = {
        msgBody: req.body.msgBody,
        senderId: req.body.senderId,
        senderName: req.body.senderName,
        recieverId: req.body.recieverId,
        msgId: randomUUID(),
        sentAt: new Date(),

    }

    // Lägga in validChannelMessage till användarens messages
    await User.updateOne(
        { _id: validChannelMessage.senderId}, 
        {$push: { messages: {$each: [validChannelMessage]} }})

    // Lägga in validChannelMessage till kanalens messages
    await Channel.updateOne(
        { _id: validChannelMessage.recieverId}, 
        {$push: { messages: {$each: [validChannelMessage]} }})


    console.log(validChannelMessage)
    res.send(validChannelMessage)
})

// POST - nytt PRIVAT kanalmeddelande
router.post('/channelmessages/private', authenticateToken, async (req, res) => {
    // console.log("Inside router.post('/channelmessages'")
    let maybeChannelMsg = req.body
    console.log('/channelmessages/private: req.body: ', req.body)

    let validChannelMessage = validateChannelMsg(maybeChannelMsg)

    if (!validChannelMessage) {
        console.log('!validChannelMessage')
        return res.sendStatus(400)
    }

    validChannelMessage = {
        msgBody: req.body.msgBody,
        senderId: req.body.senderId,
        senderName: req.body.senderName,
        recieverId: req.body.recieverId,
        msgId: randomUUID(),
        sentAt: new Date(),

    }

    // Lägga in validChannelMessage till användarens messages
    await User.updateOne(
        { _id: validChannelMessage.senderId}, 
        {$push: { messages: {$each: [validChannelMessage]} }})

    // Lägga in validChannelMessage till kanalens messages
    await PrivateChannel.updateOne(
        { _id: validChannelMessage.recieverId}, 
        {$push: { messages: {$each: [validChannelMessage]} }})


    console.log(validChannelMessage)
    res.send(validChannelMessage)
})

// Ändra på publikt meddelande
router.put('/:channelId/:msgIndex', authenticateToken, async (req,res) => {
    const channelId = req.params.channelId
    const msgIndex = req.params.msgIndex
    let maybeMessage = req.body
    // console.log('maybeMessage: ', maybeMessage)
    console.log('msgIndex i server: ', msgIndex)

    // VALIDERING
    let approved = validateChannelMsg(maybeMessage)
    // console.log('approved: ', approved)
    
    if (approved) {
        await connectDb()

        let foundChannel = Channel.findOne({ _id: channelId })
        foundChannel && console.log('found channel!')

        await Channel.updateOne(
            { _id: channelId },
            { $set: { [`messages.${msgIndex}`]: maybeMessage } }
          );



        res.sendStatus(200)
        return 
    } else {
        console.log('error')
        res.sendStatus(400)
        return
    }
})

// Ändra på privat kanalmeddelande
router.put('/private/:channelId/:msgIndex', authenticateToken, async (req,res) => {
    const channelId = req.params.channelId
    const msgIndex = req.params.msgIndex
    let maybeMessage = req.body
    // console.log('maybeMessage: ', maybeMessage)
    console.log('msgIndex i server: ', msgIndex)

    // VALIDERING
    let approved = validateChannelMsg(maybeMessage)
    // console.log('approved: ', approved)
    
    if (approved) {
        await connectDb()

        let foundChannel = Channel.findOne({ _id: channelId })
        foundChannel && console.log('found channel!')

        // Uppdatera sender
        // await User.updateOne(
        //     { _id: maybeMessage.senderId, messages: { $elemMatch: { _id: maybeMessage._id } } },
        //     { $set: { "messages.$": maybeMessage } }
        //   );
        
        // Uppdatera reciever
        // await User.updateOne(
        //     { _id: maybeMessage.recieverId, messages: { $elemMatch: { _id: maybeMessage._id } } },
        //     { $set: { "messages.$": maybeMessage } }
        //   );

        // Uppdatera konversationens meddelande?
        // await Conversation.updateOne(
        //     { _id: convId },
        //     { $set: { "messages.$[element]": maybeMessage } },
        //     { arrayFilters: [{ "element._id": maybeMessage._id }] }
        //   );

        // await Conversation.updateOne(
        //     { _id: convId },
        //     { $set: { [`messages.${msgIndex}`]: maybeMessage } }
        //   );

        // const updatedUser = await User.findOneAndUpdate(filter, update)
        // console.log(updatedUser.name, updatedUser.mail)

        await PrivateChannel.updateOne(
            { _id: channelId },
            { $set: { [`messages.${msgIndex}`]: maybeMessage } }
          );



        res.sendStatus(200)
        return 
    } else {
        console.log('error')
        res.sendStatus(400)
        return
    }
})

// Radera kanalmeddelande
router.delete('/:msgIndex', authenticateToken, async (req,res) => {
    const msgIndex = req.params.msgIndex
    const channelId = req.body.channelId
    console.log('Radera kanalmeddelande, /channels/:msgIndex: ', msgIndex)
    console.log('Radera kanalmeddelande, /channels/:channelId: ', channelId)

    try {
        await connectDb()
        const conversation = await Channel.findOne({ _id: channelId })
        // console.log(conversation)

        conversation.messages.splice(msgIndex, 1)
        await conversation.save()
        return res.sendStatus(200)
        
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(404)
    }
})


// Radera privatkanalsmeddelande
router.delete('/private/:msgIndex', authenticateToken, async (req,res) => {
    const msgIndex = req.params.msgIndex
    const channelId = req.body.channelId
    console.log('Radera privatkanalsmeddelande, /channels/private/:msgIndex: ', msgIndex)
    console.log('Radera privatkanalsmeddelande, /channels/private/:channelId: ', channelId)

    try {
        await connectDb()
        const conversation = await PrivateChannel.findOne({ _id: channelId })
        // console.log(conversation)

        conversation.messages.splice(msgIndex, 1)
        await conversation.save()
        return res.sendStatus(200)
        
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(404)
    }
})

export default router