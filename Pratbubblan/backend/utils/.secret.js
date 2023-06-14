import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

function generateKey() {
    const buffer = crypto.randomBytes(32)
    const secretKey = buffer.toString('hex')
    return secretKey
}

export const secretKey = generateKey()


export async function handlePassword(password) {
    const salt = await bcrypt.genSalt(10) 
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export async function generateToken(user) {
    
    dotenv.config()
    const secret = secretKey

    const payload = {
        uuid: user.uuid,
        name: user.name
    }

    return jwt.sign(payload, secret, {expiresIn: '1h'})
}