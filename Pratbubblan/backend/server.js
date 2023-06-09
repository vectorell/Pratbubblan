import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import conversationRoute from './routes/conversationRoutes.js'
import canalRoute from './routes/canalRoutes.js'
import morgan from 'morgan'
import { connectDb } from '../config/db.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 7344

// Anslut databas
connectDb()

app.use( cors() )
app.use( express.json() )
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body)
    next()
})

app.use(morgan('common'))

// ROUTE - användare (behöver ej auth)
// - Hämta användare
// - Hämta användardetaljer */
app.use('/api/users', userRoute)

// ROUTE - Auth (behöver auth)
/** - Auth Middleware
 *  - ***** ANVÄNDARDEL *****
 *      - Redigera användare - OK
 *      - Lägga till användare - OK
 *      - Radera användare - OK
 *  - ***** KONVERSATIONSDEL *****
 *      - Skapa ny konversation 
 *      - Hämta alla konversationer för en användare 
 *      - Hämta specifik konversation 
 *      - Radera en konversation 
 *  - ***** KANALDEL *****
 *      - Joina låsta rum 
 *      - Skapa ny kanal 
 *      - Hämta specifik kanal 
 *      - Hämta alla kanaler 
 *      - Ta bort en kanal */
app.use('/api/auth', authRoutes)










app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})