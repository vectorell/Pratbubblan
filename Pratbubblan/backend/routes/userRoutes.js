import express from 'express'
import { getDb } from '../database/database.js'
import { validateUserBody } from '../utils/validation.js'
import { random } from '../utils/assignId.js'
import jwt from 'jsonwebtoken'
import { generateToken, secretKey } from '../utils/.secret.js'
import { handlePassword } from '../utils/.secret.js'
import bcrypt from 'bcrypt'


const router = express.Router()
router.use( express.json() )

export let db = getDb('db.json', {})

/****** DENNA ROUTES UPPGIFTER ******
 * 1. Hämta alla användare - OK
 * 2. Hämta användardetaljer - OK
 * 3. Uppdatera användare - OK
 * 4. Lägga till ny användare - OK
 * 5. Radera användare - OK
 * 6. Logga in -                       */


// 1. [GET] - Hämta alla användare
router.get('/', async (req,res) => {
    await db.read()
    console.log(secretKey)
    res.send(db.data)
})

// 2. [GET] - Hämta specifik användare
router.get('/:uuid', async (req,res) => {
    const uuid = Number(req.params.uuid)

    await db.read()
    let foundUser = await db.data.users.find(user => user.uuid === uuid) 

    foundUser !== undefined ? res.send(foundUser)
    : res.sendStatus(400)
})

// 3. [PUT] - Ändra specifik användare
router.put('/:uuid', async (req,res) => {
    
    const token = req.headers.authorization?.split(' ')[1]
    const uuid = Number(req.params.uuid)
    let maybeUser = req.body

    if (!token) {
        console.log('ingen token')
        res.sendStatus(400)
        return
    }
    
    try {
        const decodedToken = jwt.verify(token, secretKey)
        console.log('inuti try')
        res.json({ message: 'Skyddad data', user: decodedToken})
        
    } catch (error) {
        console.log('inuti catch')
        res.sendStatus(400)
    }
    
    console.log('Efter Tokens, innan validering')
    // VALIDERING
    let approved = validateUserBody(maybeUser)

    if (approved) {
        await db.read()
        let oldUserIndex = await db.data.users.findIndex(user => user.uuid === uuid)
        if (oldUserIndex === -1) {
            res.sendStatus(400)
            return
        }
        maybeUser.uuid = uuid
        db.data.users[oldUserIndex] = maybeUser
        await db.write()
        res.sendStatus(200)
        return
    }
    
    res.sendStatus(400)
})

// 4. [POST] - Lägg till användare
router.post('/', async (req, res) => {
    let maybeUser = req.body
    let password = req.body.password
    
    // VALIDERING
    let approved = validateUserBody(maybeUser)
    
    if (approved) {
        await db.read()
        maybeUser.uuid = random()
        maybeUser.password = await handlePassword(password)
        db.data.users?.push(maybeUser)
        await db.write()
        res.sendStatus(200)
        return
    } else {
        res.sendStatus(400)
        return
    }

})

// 5. [DELETE] - Radera specifik användare
router.delete('/:uuid', async (req,res) => {
    const uuid = Number(req.params.uuid)

    await db.read()
    let foundUser = await db.data.users.find(user => user.uuid === uuid) 
    console.log(foundUser)

    db.data.users = db.data.users.filter(user => user !== foundUser)
    await db.write()
    res.sendStatus(200)
})


// 6. [POST] - Logga in
router.post('/login', async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const hashedPassword = await handlePassword(password)

    

    // const password = req.body.password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // console.log(hashedPassword)

    await db.read()
    // console.log(name)

    // Hitta användare i DATABAS
    let maybeUser = await db.data.users.find(user => user.name === name)
    console.log(maybeUser)

    // Om ej användare finns, skicka felmeddelande
    if (!maybeUser) {
        res.sendStatus(400)
        return
    }

    // Jämför lösenord med hjälp av bcrypt-paketet
    const isPasswordValid = await bcrypt.compare(password, maybeUser.password)
    console.log(isPasswordValid)

    // Om lösenord ej giltigt, skicka felmeddelande
    if (!isPasswordValid) {
        console.log('Invalid password')
        res.sendStatus(400)
    }

    // MEN OM INLOGGAD !! :
    if (isPasswordValid) {

        // Generera JWT-token

        const token = generateToken(maybeUser)
    
        // Skicka tillbaka JWT-token
        res.json({ token })
        return

    }




    // lägg till en skyddad route
        // Hämta JWT-token från begäran

        // Om token ej finns, skicka felmeddelande

        // Verifiera JWT-token mha jsonwebtoken-paketet

        // Om token giltig, skicka skyddad data

    res.sendStatus(400)
})




export default router