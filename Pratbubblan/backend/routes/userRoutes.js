import express from 'express'
// import { getDb } from '../database/database.js'
import { validateUserBody } from '../utils/validation.js'
// import { random } from '../utils/assignId.js'
import jwt from 'jsonwebtoken'
import { generateToken, secretKey } from '../utils/.secret.js'
// import { handlePassword } from '../utils/.secret.js'
import bcryptjs from 'bcryptjs'
import User from '../../models/Users.js'
import { connectDb } from '../../config/db.js'
import bcrypt from 'bcrypt'
// import { db } from '../../config/db.js'
import config from 'config'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
router.use( express.json() )

// export let db = getDb('db.json', {})



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




export default router