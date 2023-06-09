import express from 'express'
import jwt from 'jsonwebtoken'
import { validateChannel, validateMsg, validateUserBody } from '../utils/validation.js'
import { connectDb } from '../../config/db.js'
import { generateToken, secretKey } from '../utils/.secret.js'
import bcryptjs from 'bcryptjs'
import bcrypt from 'bcrypt'
import User from '../../models/Users.js'
import Conversation from '../../models/Conversation.js'
import dotenv from 'dotenv'
import Channel from '../../models/Channels.js'
import { randomUUID } from 'crypto'
dotenv.config()


const router = express.Router()
router.use( express.json() )

function authenticateToken(req, res, next) {
    let token = req.headers?.authorization
    console.log(token)
    const secret = secretKey
    token = token.trim()

    if (!token) {
        console.log('!token, inside auth-middleware')
        return res.sendStatus(400)
    }
    
    jwt.verify(token, secret, (err, user) => {
        console.log(user)
        if (err) {
            console.log(err)
            return res.sendStatus(400)
        }

        req.user = user
        next()
    })
}


// VILKA ROUTES SKA FINNAS HÄR I? VILKEN DATA BEHÖVS?
/**
 * Vilka användare som finns?
 * Vilka chatrum som finns?
 * Radera användare
 * Ändra på en användare
 * Lägga till användare
 */


// ENDPOINTS TILL
/** Nytt DM-"rum" om inte redan finns                   OK
 *  (ändra databas för Hämta anv + hämta spec anv)      OK
 * Hämta kanalerna                                      
 * Hämta specifik kanal                                 
 */ 


// [USERS - POST] - Logga in
router.post('/login', async (req, res) => {
    const name = req.body?.name
    const password = req.body?.password

    // Kolla om användaren finns i databas:
    let maybeUser = await User.findOne({ name: name })
    
    // Om ej användare finns, skicka felmeddelande:
    if (!maybeUser) {
        return res.sendStatus(400)
    }
    
    if (maybeUser) {
        console.log('maybeUser: ', maybeUser)

        // Om användare finns, jämför lösenord med bcrypt:
        const isPasswordValid = await bcrypt.compare(password, maybeUser.password)

        // Om lösenord ogiltigt, skicka felmeddelande:
        if (!isPasswordValid) {
            console.log('Login failed, invalid password')
            res.sendStatus(400)
            return
        }

        // Om användare finns och rätt inloggningsuppgifter givna:
        if (isPasswordValid) {
    
            // Generera JWT-token
            const token = await generateToken(maybeUser)
        
            // Skicka tillbaka JWT-token
            console.log('Login successful! Token: ', {token})
            res.send({ token })
            return
        }
    }
    return
})

// [USERS - PUT] - Ändra specifik användare
router.put('/:uuid', authenticateToken, async (req,res) => {
    const uuid = req.params.uuid
    let maybeUser = req.body
    console.log(maybeUser)

    // VALIDERING
    let approved = validateUserBody(maybeUser)
    console.log(approved)
    
    if (approved) {
        await connectDb()
        const filter = {_id: uuid}
        console.log('filter: ', filter)
        const update = {$set: maybeUser}
        
        const updatedUser = await User.findOneAndUpdate(filter, update)
        console.log(updatedUser.name, updatedUser.mail)
        res.sendStatus(200)
        return 
    } else {
        console.log('error')
        res.sendStatus(400)
        return
    }
})

// [USERS - POST] - Lägg till användare
router.post('/', authenticateToken, async (req, res) => {
    let maybeUser = req.body
    
    // VALIDERING
    let approved = validateUserBody(maybeUser)
    if (!approved) {
        res.sendStatus(400)
        return
    }
    
    // Försök skapa en ny instans av en användare
    try {
        // Kolla om användare redan finns (genom mailadress)
        await connectDb()
        const filteredUsers = await User.find({ mail: req.body.mail})
        if (filteredUsers.length > 0) {
            res.sendStatus(400)
            return
        }

        // Skapa en ny instans av en användare
        maybeUser = new User({
            name: req.body.name,
            mail: req.body.mail,
            password: req.body.password
        })

        // Kryptera användarens lösenord
        const salt = await bcryptjs.genSalt(10)
        maybeUser.password = await bcryptjs.hash(maybeUser.password, salt)

        // Spara användaren till databasen
        await maybeUser.save()

        return res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        return
    }
})

// [USERS - DELETE] - Radera specifik användare
router.delete('/:uuid', authenticateToken, async (req,res) => {
    const uuid = req.params.uuid

    try {
        await connectDb()
        await User.findOneAndDelete({ _id: uuid })
        console.log('Deletion successful!')
        return res.sendStatus(200)
        
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(404)
    }
})


// [GET - Skapa eller hämta konversation (DM)]
router.get('/conversation/:firstid/:secondid', async (req, res) => {
    let firstId = req.params.firstid
    let secondId = req.params.secondid

    // Om någon query saknas (404 Not Found)
    if ( !firstId || !secondId ) {
        console.log('At least one ID is missing from URL.')
        return res.status(404).send('At least one ID is missing from the URL.')
    }

    // Om någon query är mer eller mindre än 24 tecken (406 Not Acceptable)
    if ( firstId.length !== 24 || secondId.length !== 24 ) {
        console.log('At least one ID is not in acceptable form.')
        return res.status(406).send('At least one ID is not in an acceptable form.') // 406 Not Acceptable
    }
    
    try {
        // Om något av ID:na inte finns i databasen (404 Not Found)
        let firstIdExists =  await User.findOne({_id: firstId})
        let secondIdExists =  await User.findOne({_id: secondId})
        
        if ( !firstIdExists || !secondIdExists ) {
            console.log('At least one ID does not exist in database.')
            res.sendStatus(404)
            return 
        }
    } catch (error) {
        process.exit(1)
    }

    // Om båda ID finns men är identiska (409 Conflict)
    if (firstId === secondId) {
        console.log('ERROR: First and second ID are identical. Aborting...')
        return res.sendStatus(409)
    }




    try {
        // Kolla om det redan finns en konversation mellan de givna användarna
        let checkForExistingConversation = await Conversation.findOne({
            $and: [
                { participantsId: { $in: [firstId] } },
                { participantsId: { $in: [secondId] } }
            ]
        })

        await connectDb()
        let conversationExisting = checkForExistingConversation === undefined 
        console.log('Conversation exists? ', conversationExisting)

        if (conversationExisting) {
            return res.status(302).send(checkForExistingConversation)
            // 302 Found
        }
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }



    try {
        // Om ingen konversation finns, skapa ny
        const newConversation = new Conversation({
            participantsId: [firstId, secondId],
            creationDate: Date.now(),
        })
        
        newConversation.save()

        console.log('CONVERSATION: Successfully created conversation!')
        return res.status(201).send(newConversation)
        // 201 Created
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
})


router.get('/channels', async (req, res) => {
    try {
        const channels = await Channel.find()
        res.send(channels)
        return
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
})

// [GET] - Hämta specifik kanal
router.get('/channels/:id', async (req,res) => {
    const id = req.params.id

    try {
        await connectDb()
        let foundChannel = await Channel.findOne({ _id: id })

        if(foundChannel !== undefined) {
            console.log('Found channel!: ', foundChannel)
            res.status(302).send(foundChannel) // 302 Found
            return
        } else {
            console.log('Could not find channel.. Aborting..')
            res.sendStatus(404) // 404 Not Found
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
        return
    }
    return
})

// [CHANNELS - POST] - Lägg till kanal
router.post('/channels', async (req, res) => {
    let maybeChannel = req.body
    
    // VALIDERING
    let approved = validateChannel(maybeChannel)
    if (!approved) {
        res.sendStatus(400)
        return
    }
    
    // Försök skapa en ny instans av en kanal
    try {
        // Kolla om kanal redan finns (genom mailadress)
        await connectDb()
        const filteredChannels = await Channel.find({ channelName: req.body.channelName})
        if (filteredChannels.length > 0) {
            res.sendStatus(400)
            return
        }

        // Skapa en ny instans av en kanal
        maybeChannel = new Channel({
            channelName: req.body.channelName,
            isLocked: req.body.isLocked
        })

        // Spara kanalen till databasen
        await maybeChannel.save()

        return res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        return
    }
})

router.post('/messages', async (req, res) => {
    let maybeMsg = req.body

    let validMessage = validateMsg(maybeMsg)

    if (!validMessage) {
        return res.sendStatus(400)
    }

    validMessage = {
        msgBody: req.body.msgBody,
        senderId: req.body.senderId,
        recieverId: req.body.recieverId,
        belongsTo: req.body.belongsTo,
        msgId: randomUUID()
    }

    // Lägga in validMessage till sändare och mottagares messages
    // let foundSender = await User.findOne({ _id: validMessage.senderId })
    await User.updateOne(
        { _id: validMessage.senderId}, 
        {$push: { messages: {$each: [validMessage]} }})

    await User.updateOne(
        { _id: validMessage.recieverId}, 
        {$push: { messages: {$each: [validMessage]} }})

        // console.log(User.findOne({ _id: validMessage.senderId}))
    
    // Lägga in validMessage till belongsTo
    

    // 
    // await User.save()

    console.log(validMessage)
    res.send(maybeMsg)
})






router.get('/control', authenticateToken, (req,res) => {
    res.send('GET /api/users<br/> <h1>  AUTH success! </h1>')
})

export default router