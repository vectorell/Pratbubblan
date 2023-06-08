import express from 'express'
import jwt from 'jsonwebtoken'
import { validateUserBody } from '../utils/validation.js'
import { connectDb } from '../../config/db.js'
import { generateToken, secretKey } from '../utils/.secret.js'
import bcryptjs from 'bcryptjs'
import bcrypt from 'bcrypt'
import User from '../../models/Users.js'
// import { authToken } from './userRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

// import { token } from './userRoutes.js'


const router = express.Router()
router.use( express.json() )

async function authenticateToken(req, res, next) {

    const rawToken = await authToken
    let token
    let secret

    if(authToken) {
        token = rawToken.trim()
        secret = secretKey
    }

    if (!token) {
        console.log('!token, rad 29')
        res.sendStatus(400)
        return
    }
    
    jwt.verify(token, secret, (err, user) => {
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


let authToken
// 6. [POST] - Logga in
router.post('/login', async (req, res) => {
    const name = req.body?.name
    const password = req.body?.password

    // Kolla om användaren finns i databasen:
    let maybeUser = await User.findOne({ name: name })
    console.log(maybeUser)

    // Om ej användare finns, skicka felmeddelande:
    if (!maybeUser) {
        // console.log(`inuti !maybeUser: ${maybeUser}`)
        return res.sendStatus(400)
    }

    if (maybeUser) {
        // Om användare finns, jämför lösenord med hjälp av bcrypt-paketet:
        const isPasswordValid = await bcrypt.compare(password, maybeUser.password)
        // console.log(isPasswordValid)

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
            authToken = token
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

    const rawToken = await authToken
    const token = await rawToken

    if (!token) {
        // console.log('ingen token')
        res.sendStatus(400)
        return
    }
    
    try {
        const decodedToken = jwt.verify(token, secretKey)
        // console.log('inuti try')
        res.json({ message: 'Skyddad data', user: decodedToken})
        
    } catch (error) {
        // console.log('inuti catch')
        res.sendStatus(400)
    }
    
    // console.log('Efter Tokens, innan validering')
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
        
        return 
    } else {
        console.error(error.message)
        res.sendStatus(500)
        return
    }
})

// 4. [POST] - Lägg till användare
router.post('/', authenticateToken, async (req, res) => {
    let maybeUser = req.body
    // console.log('test1')
    
    // VALIDERING
    let approved = validateUserBody(maybeUser)
    if (!approved) {
        // console.log("1")
        res.sendStatus(400)
        return
    }
    
    // Försök skapa en ny instans av en användare
    try {
        // console.log("2")
        // Kolla om användare redan finns (genom mailadress)
        await connectDb()
        const filteredUsers = await User.find({ mail: req.body.mail})
        if (filteredUsers.length > 0) {
            // console.log('2')
            res.sendStatus(400)
            return
        }
        
        // console.log('3')
        // Skapa en ny instans av en användare
        maybeUser = new User({
            name: req.body.name,
            mail: req.body.mail,
            password: req.body.password
        })
        // console.log('4')
        // Kryptera användarens lösenord
        const salt = await bcryptjs.genSalt(10)
        maybeUser.password = await bcryptjs.hash(maybeUser.password, salt)
        
        // console.log('5')
        // Spara användaren till databasen
        await maybeUser.save()
        // console.log('6')
        const payload = { 
            user: { 
                id: maybeUser.id 
            }
        }
        // console.log('7')
        // TODO: Ändra tillbaka till 3600
        const token = jwt.sign(payload, secretKey, {expiresIn: 36000})
        // console.log('8')
        res.json({ token })
        
    } catch (error) {
        // console.log('9')
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