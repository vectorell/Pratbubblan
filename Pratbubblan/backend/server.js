import express from 'express'
// import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import canalRoute from './routes/canalRoutes.js'
import morgan from 'morgan'
import { connectDb } from './utils/db.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 7344

// Anslut databas
connectDb()

// app.use( cors() )
app.use( express.json() )
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body)
    next()
})

app.use(morgan('common'))


app.use('/api/users', userRoute)
app.use('/api/channels', canalRoute)
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})