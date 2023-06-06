import express from 'express'
import { getDb } from '../database/database.js'
import { validateUserBody } from '../utils/validation.js'
import { random } from '../utils/assignId.js'
import jwt from 'jsonwebtoken'


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
    const uuid = Number(req.params.uuid)
    let maybeUser = req.body

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
    
    // VALIDERING
    let approved = validateUserBody(maybeUser)
    
    if (approved) {
        await db.read()
        maybeUser.uuid = random()
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

export default router