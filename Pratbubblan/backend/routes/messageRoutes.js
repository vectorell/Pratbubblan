import express from 'express'
import { validateDmMsg } from '../utils/validation.js'
import Conversation from '../../models/Conversation.js'
import { connectDb } from '../utils/db.js'
import User from '../../models/Users.js'
import mongoose from 'mongoose'
import { authenticateToken } from './authRoutes.js'

const router = express.Router()
router.use( express.json() )

// Ändra på meddelande
router.put('/:convId', async (req,res) => {
    const convId = req.params.convId
    let maybeMessage = req.body
    // console.log('maybeMessage: ', maybeMessage)

    // VALIDERING
    let approved = validateDmMsg(maybeMessage)
    // console.log('approved: ', approved)
    
    if (approved) {
        await connectDb()

        let foundConversation = Conversation.findOne({ _id: convId })

        // Uppdatera sender
        await User.updateOne(
            { _id: maybeMessage.senderId, messages: { $elemMatch: { _id: maybeMessage._id } } },
            { $set: { "messages.$": maybeMessage } }
          );
        
        // Uppdatera reciever
        await User.updateOne(
            { _id: maybeMessage.recieverId, messages: { $elemMatch: { _id: maybeMessage._id } } },
            { $set: { "messages.$": maybeMessage } }
          );

        // Uppdatera konversationens meddelande?
        await Conversation.updateOne(
            { _id: convId },
            { $set: { "messages.$[element]": maybeMessage } },
            { arrayFilters: [{ "element._id": maybeMessage._id }] }
          );

        // const updatedUser = await User.findOneAndUpdate(filter, update)
        // console.log(updatedUser.name, updatedUser.mail)
        res.sendStatus(200)
        return 
    } else {
        console.log('error')
        res.sendStatus(400)
        return
    }
})

// Radera meddelande
router.delete('/:msgIndex', authenticateToken, async (req,res) => {
    const msgIndex = req.params.msgIndex
    const conversationId = req.body.conversationId
    console.log('Radera meddelande, /delete/:msgIndex: ', msgIndex)

    try {
        await connectDb()
        const conversation = await Conversation.findOne({ _id: conversationId })
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