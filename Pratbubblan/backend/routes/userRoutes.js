import express from 'express'
import User from '../../models/Users.js'
import { connectDb } from '../utils/db.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
router.use( express.json() )


// [GET] - Hämta alla användare
router.get('/', async (req,res) => {

    try {
        const users = await User.find()
        res.send(users)
        return
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
})

// [GET] - Hämta specifik användare
router.get('/:uuid', async (req,res) => {
    const uuid = req.params.uuid

    try {
        await connectDb()
        let foundUser = await User.findOne({ _id: uuid })

        if(foundUser !== undefined) {
            console.log('Found user!: ', foundUser)
            res.status(302).send(foundUser) // 302 Found
            return
        } else {
            console.log('Could not find user.. Aborting..')
            res.sendStatus(404) // 404 Not Found
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
        return
    }
    return
})


export default router