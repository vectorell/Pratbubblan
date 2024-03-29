import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import canalRoute from './routes/canalRoutes.js'
import morgan from 'morgan'
import { connectDb } from './utils/db.js'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
dotenv.config()
const port = process.env.PORT

// Anslut databas
connectDb()

const whereWeAre = dirname(fileURLToPath(import.meta.url))
const dist = join(whereWeAre, '../dist')
app.use( express.static(dist) )

app.use( cors() )
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