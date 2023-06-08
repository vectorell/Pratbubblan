import express from 'express'
import jwt from 'jsonwebtoken'
import { validateUserBody } from '../utils/validation.js'
import { connectDb } from '../../config/db.js'
import { generateToken, secretKey } from '../utils/.secret.js'
import bcryptjs from 'bcryptjs'
import bcrypt from 'bcrypt'
import User from '../../models/Users.js'
import dotenv from 'dotenv'
dotenv.config()


const router = express.Router()
router.use( express.json() )

function authenticateToken(req, res, next) {
    console.log('REQBODY inuti authToken', req.body)
    console.log('req.header... ',req.headers.authorization)

    let token = req.headers?.authorization
    const secret = secretKey

    token = token.trim()

    if (!token) {
        console.log('!token, rad 29')
        res.sendStatus(400)
        return
    }
    
    jwt.verify(token, secret, (err, user) => {
        console.log(user)
        if (err) {
            console.log(err)
            res.sendStatus(400)
            return
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
/** Nytt DM-"rum" om inte redan finns
 *  (ändra databas för Hämta anv + hämta spec anv)
 * Hämta kanalerna
 * Hämta specifik kanal
 */ 


// 6. [POST] - Logga in
router.post('/login', async (req, res) => {
    const name = req.body?.name
    const password = req.body?.password

    // Kolla om användaren finns i databasen:
    let maybeUser = await User.findOne({ name: name })
    console.log(maybeUser)

    // Om ej användare finns, skicka felmeddelande:
    if (!maybeUser) {
        return res.sendStatus(400)
    }

    if (maybeUser) {
        // Om användare finns, jämför lösenord med hjälp av bcrypt-paketet:
        const isPasswordValid = await bcrypt.compare(password, maybeUser.password)

        // Om lösenord ej giltigt, skicka felmeddelande:
        if (!isPasswordValid) {
            console.log('Invalid password')
            res.sendStatus(400)
        }

        // Om användare finns och rätt inloggningsuppgifter givna:
        if (isPasswordValid) {
    
            // Generera JWT-token
            const token = generateToken(maybeUser)
        
            // Skicka tillbaka JWT-token
            console.log({token})
            res.json({ token: token })
            return
        }
    }
    return
})

// 3. [PUT] - Ändra specifik användare
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
        res.sendStatus(500)
        return
    }
})

// 4. [POST] - Lägg till användare
router.post('/', authenticateToken, async (req, res) => {
    let maybeUser = req.body
    
    // VALIDERING
    let approved = validateUserBody(maybeUser)
    if (!approved) {
        // console.log("1")
        res.sendStatus(400)
        return
    }
    
    // Försök skapa en ny instans av en användare
    try {
        // Kolla om användare redan finns (genom mailadress)
        await connectDb()
        const filteredUsers = await User.find({ mail: req.body.mail})
        if (filteredUsers.length > 0) {
            // console.log('2')
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
    }
})

// 5. [DELETE] - Radera specifik användare
router.delete('/:uuid', authenticateToken, async (req,res) => {
    const uuid = req.params.uuid

    try {
        await connectDb()
        await User.findOneAndDelete({ _id: uuid })
        console.log('Successful deletion!')
        res.sendStatus(200)
        
    } catch (error) {
        console.error(error.message)
    }
})


router.get('/', authenticateToken, (req,res) => {
    res.send('GET /api/users<br/> <h1>  AUTH success! </h1>')
})

export default router