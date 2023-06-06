import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import userRoute from './routes/userRoutes.js'
import authRoute from './routes/authRoutes.js'
import conversationRoute from './routes/conversationRoutes.js'
import canalRoute from './routes/canalRoutes.js'
import morgan from 'morgan'

const app = express()
dotenv.config()
const port = process.env.PORT || 7344
// const port = 7344


app.use( cors() )
app.use( express.json() )
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body)
    next()
})

app.use(morgan('common'))

// ROUTE - användare
// (lägga till ny, logga in, hämta anv.detaljer, uppdatera användare)
app.use('/api/users', userRoute)

// ROUTE - auth
// (generera JWT-token för auth, validera JWT-token, kontrollera authent/authoriz med middleware)
app.use('/api/login', authRoute)

// ROUTE - konversationer
// (skapa ny konv, hämta specifik konv, hämta alla konv för en anv, uppdatera en konv, radera en konv)
app.use('/api/conversations', conversationRoute)

// ROUTE - kanaler
// (skapa ny kanal, hämta specifik kanal, hämta alla kanaler, uppdatera en kanal, ta bort en kanal)
app.use('/api/viewcanals', canalRoute)




app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})