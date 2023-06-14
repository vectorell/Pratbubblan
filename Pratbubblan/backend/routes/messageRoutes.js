import express from 'express'
import { validateDmMsg } from '../utils/validation.js'
import Conversation from '../../models/Conversation.js'

const router = express.Router()
router.use( express.json() )

router.put('/:convId', async (req,res) => {
    const convId = req.params.uuid
    let maybeMessage = req.body
    console.log('maybeMessage: ', maybeMessage)

    // VALIDERING
    let approved = validateDmMsg(maybeMessage)
    console.log('approved: ', approved)
    
    if (approved) {
        await connectDb()

        let foundConversation = Conversation.findOne({ _id: convId })
        console.log(foundConversation)

        // const filter = {_id: uuid}
        // console.log('filter: ', filter)
        // const update = {$set: maybeMessage}
        
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

export default router