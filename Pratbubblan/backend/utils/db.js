import mongoose from "mongoose";
import config from "config";
export const db = config.get('mongoURI')

export async function connectDb() {
    try {
        await mongoose.connect(db, {useNewUrlParser: true}) // ger tillbaka ett promise
        console.log('MongoDB ansluten..')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}