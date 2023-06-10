import mongoose from "mongoose";

const ChannelMessageSchema = new mongoose.Schema({
    msgId: String,
    senderId: String,
    recieverId: String,
    msgBody: String,
    sentAt: { type: Date, default: Date.now() }
})

const ChannelMessage = mongoose.model('Channelmessage', MessageSchema)
export default ChannelMessage