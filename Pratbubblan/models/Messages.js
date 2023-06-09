import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    msgId: String,
    senderId: String,
    recieverId: String,
    msgBody: String,
    sentAt: { type: Date, default: Date.now() },
    belongsTo: String
})

const Message = mongoose.model('Message', MessageSchema)
export default Message