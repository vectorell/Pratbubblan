import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export async function connectDb() {
    const db = process.env.mongoURI
    try {
        await mongoose.connect(db, {useNewUrlParser: true}) // ger tillbaka ett promise
        console.log('MongoDB ansluten..')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}